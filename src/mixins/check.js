export default {
  methods: {
    checkPermission(str) {
      const roles = this.$store.getters.roles
      if (roles) {
        return roles.points.includes(str)
      } else {
        return false
      }
    }
  }
}
