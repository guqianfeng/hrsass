export default {
  created() {
    console.log('created', this.title)
  },
  data() {
    return {
      title: 'mixins'
    }
  }
}
