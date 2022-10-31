<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card v-loading="isLoading">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="role">
            <el-button type="primary" size="small" @click="dialogVisible = true">+ 新增角色</el-button>
            <el-table :data="list">
              <el-table-column label="序号" type="index" width="80" :index="indexMethod" />
              <el-table-column label="角色名称" prop="name" width="120" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button type="text" size="small">分配权限</el-button>
                  <el-button type="text" size="small" @click="edit(row.id)">编辑</el-button>
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
          <el-tab-pane label="公司信息">
            <!-- 警告信息 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <!-- 表单 -->
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyForm.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog
        :title="showTitle"
        :visible="dialogVisible"
        @close="closeDialog"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请填入角色名称" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" placeholder="请填入角色描述" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button>取消</el-button>
          <el-button type="primary" @click="clickSubmit">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqGetCompanyById } from '@/api/company'
import { reqAddRole, reqDelRole, reqGetRoleDetail, reqGetRoleList, reqUpdateRole } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      companyForm: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      activeName: 'role',
      page: 1,
      pagesize: 3,
      list: [],
      total: 0,
      isLoading: false,
      dialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{
          required: true, message: '请填写角色名称', trigger: ['blur', 'change']
        }],
        description: [{
          required: true, message: '请填写角色描述', trigger: ['blur', 'change']
        }]
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    showTitle() {
      return this.form.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo() // 获取公司信息
  },
  methods: {
    async getCompanyInfo() {
      const { data } = await reqGetCompanyById(this.userInfo.companyId)
      this.companyForm = data
    },
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
    },
    async edit(id) {
      this.dialogVisible = true
      const { data } = await reqGetRoleDetail(id)
      this.form = data
    },
    closeDialog() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
      this.form.id = ''
    },
    clickSubmit() {
      this.$refs.form.validate(async flag => {
        if (!flag) return
        if (!this.form.id) {
          await reqAddRole(this.form)
          this.$message.success('添加角色成功')
        } else {
          await reqUpdateRole(this.form)
          this.$message.success('修改角色成功')
        }
        this.closeDialog()
        this.getRoleList()
      })
    }
  }
}
</script>

<style></style>
