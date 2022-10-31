<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card v-loading="isLoading">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="small">+ 新增角色</el-button>
            <el-table :data="list">
              <el-table-column label="序号" type="index" width="80" :index="indexMethod" />
              <el-table-column label="角色名称" prop="name" width="120" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button type="text" size="small">分配权限</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination
              :current-page="page"
              :page-sizes="[1, 2, 3, 4]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="company">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqDelRole, reqGetRoleList } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'role',
      page: 1,
      pagesize: 3,
      list: [],
      total: 0,
      isLoading: false
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      this.isLoading = true
      const { data: { rows, total }} = await reqGetRoleList(this.page, this.pagesize)
      // console.log({ rows, total })
      this.list = rows
      this.total = total
      this.isLoading = false
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.page = 1
      this.getRoleList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoleList()
    },
    indexMethod(index) {
      return index + 1 + (this.page - 1) * this.pagesize
    },
    del(id) {
      this.$confirm('确定要删除该角色吗', '温馨提示').then(async() => {
        await reqDelRole(id)
        // console.log(res)
        this.$message.success('删除成功')
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.getRoleList()
      }).catch(() => {
        console.log('取消删除')
      })
    }
  }
}
</script>

<style></style>
