<template>
  <el-dialog class="assign-role" title="分配角色" :visible="showRoleDialog" @close="closeRoleDialog" @open="openRoleDialog">
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList" v-loading="loading">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="clickAssignRoles">确定</el-button>
      <el-button size="small" @click="closeRoleDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetRoleList } from '@/api/setting'
import { reqAssignRoles, reqGetUserDetailById } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      roleList: [],
      loading: false
    }
  },
  methods: {
    async clickAssignRoles() {
      await reqAssignRoles(this.userId, this.checkList)
      this.$message.success('分配成功')
      this.closeRoleDialog()
    },
    async getRoleList() {
      const { data: { rows }} = await reqGetRoleList(1, 9999)
      this.roleList = rows
    },
    async getEmployeeDetail() {
      const { data: { roleIds }} = await reqGetUserDetailById(this.userId)
      this.checkList = roleIds
    },
    openRoleDialog() {
      this.loading = true
      Promise.all([this.getRoleList(), this.getEmployeeDetail()]).then(_ => {
        this.loading = false
      })
    },
    closeRoleDialog() {
      this.$emit('update:showRoleDialog', false)
      this.checkList = []
    }
  }
}
</script>
