<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 -->
        <!-- 用了一个行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <el-col :span="20">
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex">
              <!-- 两个内容 -->
              <el-col :span="12">负责人</el-col>
              <el-col :span="12">
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 内容 -->
        <el-tree :data="list" />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments',
  data() {
    return {
      list: [
        {
          label: 'A组',
          children: [
            { label: 'A-1组', children: [
              { label: '张三' },
              { label: '张三' },
              { label: '张三' }
            ] },
            { label: 'A-2组' },
            { label: 'A-3组' }
          ]
        },
        {
          label: 'B组'
        },
        {
          label: 'C组'
        }
      ]
    }
  }
}
</script>

<style></style>
