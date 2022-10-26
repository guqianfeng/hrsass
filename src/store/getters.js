const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  name: (state) => state.user.userInfo.username,
};
// this.$store.state.user.token
// this.$store.getters.token
export default getters;
