<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: 16 条</span>
        </template>

        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import?type=user')">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>

      <el-card v-loading="isLoading" style="margin-top: 10px;">
        <el-table border :data="list">
          <el-table-column width="80" label="序号" type="index" sortable="" :index="indexMethod" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" :formatter="formatEmployment" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template #default="{row}">
              {{ row.timeOfEntry | formatTime('YYYY-MM-DD') }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployment(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :current-page="page"
            :page-sizes="[1, 2, 3, 4, 5]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
      <add-employee :show-dialog.sync="showDialog" @add-employee="getUserList" />
    </div>
  </div>
</template>
<script>
import { reqDelEmployee, reqGetUserList } from '@/api/employees'
import employeesConstant from '@/constant/employees'
import addEmployee from './components/add-employee.vue'
export default {
  name: 'Employees',
  components: { addEmployee },
  data() {
    return {
      page: 1,
      size: 5,
      list: [],
      total: 0,
      isLoading: false,
      showDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    delEmployment(id) {
      this.$confirm('确认删除该角色吗', '温馨提示').then(async() => {
        await reqDelEmployee(id)
        this.$message.success('删除成功')
        if (this.list.length === 1 && this.page > 1) {
          this.page--
        }
        this.getUserList()
      }).catch(error => {
        console.log(error)
      })
    },
    async getUserList() {
      this.isLoading = true
      const { data: { total, rows }} = await reqGetUserList(this.page, this.size)
      this.list = rows
      this.total = total
      this.isLoading = false
    },
    handleSizeChange(val) {
      this.size = val
      this.page = 1
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getUserList()
    },
    indexMethod(index) {
      return index + 1 + (this.page - 1) * this.size
    },
    formatEmployment(row, column, cellValue, index) {
      const result = employeesConstant.hireType.find(item => item.id === +cellValue)
      return result ? result.value : '未知'
    }
  }
}
</script>

<style></style>
