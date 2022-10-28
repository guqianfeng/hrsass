<template>
  <el-dialog
    title="温馨提示"
    :visible="dialogVisible"
  >
    <span>这是一段信息</span>
    <template #footer>
      <el-button>取消</el-button>
      <el-button type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>
