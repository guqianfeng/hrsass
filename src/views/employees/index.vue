<template>
  <div class="employees-container">
    <div class="app-container">
      <page-tools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>

        <template #right>
          <el-button
            v-if="checkPermission('excel_import')"
            type="warning"
            size="small"
            @click="$router.push('/import?type=user')"
          >excel导入</el-button>
          <el-button
            v-if="checkPermission('excel_export')"
            type="danger"
            size="small"
            @click="handleExport"
          >excel导出</el-button>
          <el-button
            type="primary"
            size="small"
            @click="clickAddEmployees"
          >新增员工</el-button>
        </template>
      </page-tools>

      <el-card v-loading="isLoading" style="margin-top: 10px">
        <el-table border :data="list">
          <el-table-column
            width="80"
            label="序号"
            type="index"
            sortable=""
            :index="indexMethod"
          />
          <el-table-column label="头像" prop="staffPhoto" sortable="">
            <template #default="{row}">
              <img v-imgerror="errorImg" class="user-staff-photo" :src="row.staffPhoto || defaultImg" @click="showQRcode(row.staffPhoto)">
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template #default="{ row }">
              {{ row.timeOfEntry | formatTime("YYYY-MM-DD") }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button :disabled="!checkPermission('user_look')" type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRow(row.id)">角色</el-button>
              <el-button
                :disabled="!checkPermission('user_del')"
                type="text"
                size="small"
                @click="delEmployment(row.id)"
              >删除</el-button>
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
      <add-employee
        :show-dialog.sync="showDialog"
        @add-employee="getUserList"
      />
      <el-dialog :width="'400px'" title="头像二维码" :visible="showImgDialog" @close="showImgDialog = false">
        <div style="text-align: center">
          <canvas ref="myCanvas" />
        </div>
      </el-dialog>
      <assign-role :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
    </div>
  </div>
</template>
<script>
import { reqDelEmployee, reqGetUserList } from '@/api/employees'
import employeesConstant from '@/constant/employees'
import dayjs from 'dayjs'
import addEmployee from './components/add-employee.vue'
import errorImg from '@/assets/common/bigUserHeader.png'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'
import hello from '@/mixins/hello'
import check from '@/mixins/check'
export default {
  name: 'Employees',
  components: { addEmployee, AssignRole },
  mixins: [hello, check],
  data() {
    return {
      title: '员工',
      page: 1,
      size: 5,
      list: [],
      total: 0,
      isLoading: false,
      showDialog: false,
      showImgDialog: false,
      defaultImg: 'https://img2.baidu.com/it/u=1759928947,4205593072&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=934',
      errorImg,
      showRoleDialog: false,
      userId: ''
    }
  },
  created() {
    console.log('员工页的created')
    this.getUserList()
  },
  methods: {
    clickAddEmployees() {
      if (!this.checkPermission('user_add')) {
        this.$message.error('请联系管理员添加权限')
        return
      }
      this.showDialog = true
    },
    editRow(id) {
      this.showRoleDialog = true
      this.userId = id
    },
    async handleExport() {
      const {
        data: { rows }
      } = await reqGetUserList(1, this.total)
      const headersArr = [
        '姓名',
        '手机号',
        '入职日期',
        '聘用形式',
        '转正日期',
        '工号',
        '部门'
      ]
      const headersRelations = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      const resultArr = this.formatFn(rows, headersArr, headersRelations)
      const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      // console.log({ resultArr })
      import('@/vendor/Export2Excel').then((excel) => {
        // console.log(excel)
        excel.export_json_to_excel({
          header: headersArr,
          data: resultArr,
          filename: '员工信息表',
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          multiHeader,
          merges
        })
      })
    },
    formatFn(rows, headersArr, headersRelations) {
      const result = []
      rows.forEach((row) => {
        const itemArr = []
        headersArr.forEach((key) => {
          const enKey = headersRelations[key]
          let val = row[enKey]
          if (['timeOfEntry', 'correctionTime'].includes(enKey)) {
            val = dayjs(val).format('YYYY年MM月DD日')
          }
          if (enKey === 'formOfEmployment') {
            const result = employeesConstant.hireType.find(
              (item) => item.id === val
            )
            val = result ? result.value : '未知'
          }
          itemArr.push(val)
        })
        result.push(itemArr)
      })
      return result
    },
    delEmployment(id) {
      this.$confirm('确认删除该角色吗', '温馨提示')
        .then(async() => {
          await reqDelEmployee(id)
          this.$message.success('删除成功')
          if (this.list.length === 1 && this.page > 1) {
            this.page--
          }
          this.getUserList()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async getUserList() {
      this.isLoading = true
      const {
        data: { total, rows }
      } = await reqGetUserList(this.page, this.size)
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
      const result = employeesConstant.hireType.find(
        (item) => item.id === +cellValue
      )
      return result ? result.value : '未知'
    },
    showQRcode(imgUrl) {
      if (!imgUrl) return
      this.showImgDialog = true
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.myCanvas, imgUrl)
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.user-staff-photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
</style>
