<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dialogVisible" @close="handleCloseDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <!-- 校验 4项 :model :rules prop v-model -->
    <el-form label-width="120px" :model="form" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <div slot="footer">
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    },
    deptList: {
      type: Array,
      required: true
    }
  },
  data() {
    const validatorName = (rules, value, callback) => {
    //   console.log(value, this.nodeData)
      const arr = this.nodeData.children
      const isRepeat = arr.some(item => item.name === value)
      isRepeat ? callback(new Error('部门名重复')) : callback()
    }
    const validatorCode = (values, value, callback) => {
      const isRepeat = this.deptList.some(item => item.code === value)
      isRepeat ? callback('部门编码已存在') : callback()
    }
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请填写部门名称', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: ['blur', 'change'] },
          { validator: validatorName, trigger: ['blur'] }
        ],
        code: [
          { required: true, message: '请填写部门编码', trigger: ['blur', 'change'] },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: ['blur', 'change'] },
          { validator: validatorCode, trigger: ['blur'] }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '请填写部门介绍', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    handleCloseDialog() {
      this.$emit('close-dialog', false)
    }
  }
}
</script>

<style>

</style>
