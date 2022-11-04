<template>
  <el-dialog class="assign-role" title="分配角色" :visible="showRoleDialog" @close="closeRoleDialog" @open="openRoleDialog">
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetRoleList } from '@/api/setting'
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
      roleList: []
    }
  },
  methods: {
    async getRoleList() {
      const { data: { rows }} = await reqGetRoleList(1, 9999)
      this.roleList = rows
    },
    openRoleDialog() {
      this.getRoleList()
    },
    closeRoleDialog() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>
