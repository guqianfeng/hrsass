<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col :span="20">
      <span>{{ nodeData.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ nodeData.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部分</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(cmd) {
      // console.log(cmd)
      switch (cmd) {
        case 'add':
          console.log('add')
          break
        case 'del':
          console.log('del')
          break
        case 'edit':
          console.log('edit')
          break
      }
    }
  }
}
</script>

<style>

</style>
