<template>
  <svg-icon :icon-class="isFull ? 'exit-fullscreen' : 'fullscreen'" class="fullscreen" @click="toggle" />
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'ScreenFull',
  data() {
    return {
      isFull: false
    }
  },
  methods: {
    toggle() {
      if (ScreenFull.isEnabled) {
        ScreenFull.toggle()
        this.isFull = !this.isFull
      } else {
        this.$message.warning('更换浏览器哈')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  width: 40px;
  height: 40px;
  fill: #fff;
  cursor: pointer;
}
</style>
