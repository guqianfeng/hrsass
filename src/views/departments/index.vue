<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card v-loading="loading" class="tree-card">
        <!-- 头部 -->
        <!-- 用了一个行列布局 -->
        <tree-tools :node-data="company" is-root @add-depts="handleAddDepts" />
        <!-- 内容 -->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <template #default="{data}">
            <tree-tools :node-data="data" @del-depts="getDepartments" @add-depts="handleAddDepts" @edit-depts="handleEditDepts" />
          </template>
        </el-tree>
      </el-card>
      <add-dept ref="addDept" :dept-list="deptList" :dialog-visible.sync="dialogVisible" :node-data="nodeData" @add-depts="getDepartments" />
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { reqGetDepartments } from '@/api/departments'
import { delay, transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'

export default {
  name: 'Departments',
  components: { treeTools, AddDept },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      dialogVisible: false,
      nodeData: {},
      deptList: [],
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      // await delay(2000)
      const { data: { depts, companyName }} = await reqGetDepartments()
      this.loading = false
      this.deptList = depts
      const treeData = transListToTreeData(depts, '')
      this.company.name = companyName
      this.company.id = ''
      this.departs = treeData
    },
    handleAddDepts(nodeData) {
      this.dialogVisible = true
      this.nodeData = nodeData
      // 发送请求
      // console.log('发送请求')
      // this.$refs.addDept.getUserSimpleList()
      this.$nextTick(() => {
        // this.$refs.addDept.showTitle = '新增部门'
      })
    },
    handleEditDepts(nodeData) {
      this.dialogVisible = true
      this.nodeData = nodeData
      // this.$refs.addDept.getUserSimpleList()
      this.$nextTick(() => {
        // this.$refs.addDept.showTitle = '修改部门'
        this.$refs.addDept.getDeptDetail()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
