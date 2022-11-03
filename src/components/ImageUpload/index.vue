<template>
  <div class="image-upload">
    <el-upload
      :class="{disabled}"
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="limit"
      :http-request="handleRequest"
      :on-change="handleChange"
      :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
      fileList: []
    }
  },
  computed: {
    disabled() {
      return this.fileList.length >= this.limit
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        return false
      }
      return true
    },
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    handleRequest(e) {
      console.log('request', e.file)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.fileList = [...fileList]
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  ::v-deep {
    .el-upload--picture-card {
      display: none
    }
  }
}
</style>
