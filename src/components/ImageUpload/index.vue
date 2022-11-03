<template>
  <div class="image-upload">
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus" />
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file)
    }
  }
}
</script>

<style>

</style>
