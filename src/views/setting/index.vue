<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="small">+ 新增角色</el-button>
            <el-table :data="list">
              <el-table-column label="序号" type="index" width="80" />
              <el-table-column label="角色名称" prop="name" width="120" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button type="text" size="small">分配权限</el-button>
                <el-button type="text" size="small">编辑</el-button>
                <el-button type="text" size="small">删除</el-button>
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
      page: 1,
      pagesize: 3,
      list: [],
      total: 0
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: { rows, total }} = await reqGetRoleList(this.page, this.pagesize)
      // console.log({ rows, total })
      this.list = rows
      this.total = total
    }
  }
}
</script>

<style></style>
