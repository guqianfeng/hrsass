<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary">+ 新增角色</el-button>
            <el-table :data="list">
              <el-table-column label="序号" />
              <el-table-column label="角色名称" />
              <el-table-column label="描述" />
              <el-table-column label="操作">
                <el-button type="success">分配权限</el-button>
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqGetRoleList } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'role',
      list: [],
      page: 1,
      pagesize: 3,
      total: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: { rows, total }} = await reqGetRoleList(this.page, this.pagesize)
      console.log({ rows, total })
    }
  }
}
</script>

<style></style>
