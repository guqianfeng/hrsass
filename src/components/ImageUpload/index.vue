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
// SecretId: AKIDSp11nJdpohXOzSjplTxDE1XpCMHwOefS
// SecretKey: cy74vY5QZIn496qOhkaCf5KOacwISN4V

import COS from 'cos-js-sdk-v5' // 导入腾讯云的包(sdk)
const cos = new COS({
  SecretId: 'AKIDSp11nJdpohXOzSjplTxDE1XpCMHwOefS', // 身份识别ID
  SecretKey: 'cy74vY5QZIn496qOhkaCf5KOacwISN4V' // 身份秘钥
})

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
      cos.putObject({
        Bucket: 'fred-1308337721', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: +Date.now() + '_' + e.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: e.file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, function(err, data) {
        console.log(err || data)
      })
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
