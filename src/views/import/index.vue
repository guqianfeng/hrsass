<template>
  <div>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
export default {
  methods: {
    handleSuccess({ header, results }) {
      console.log(header, results)
    }
  }
}
</script>

<style>

</style>
