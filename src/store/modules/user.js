import { reqLogin } from "@/api/user";
const state = {
  token: "",
};
const getters = {};
const mutations = {
  setToken(state, newToken) {
    state.token = newToken;
  },
};
const actions = {
  async login(context, data) {
    const res = await reqLogin(data);
    // console.log(res.data.data);
    context.commit("setToken", res.data.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
