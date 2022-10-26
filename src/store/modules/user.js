import { reqGetProfile, reqLogin } from "@/api/user";
import { getToken, setToken } from "@/utils/auth";
const state = {
  token: getToken(),
  userInfo: {},
};
const getters = {};
const mutations = {
  setToken(state, newToken) {
    state.token = newToken;
    setToken(newToken);
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo;
  },
};
const actions = {
  async login(context, data) {
    const res = await reqLogin(data);
    // console.log(res.data.data);
    context.commit("setToken", res.data);
    return res;
  },
  async getUserInfo(context) {
    const res = await reqGetProfile();
    context.commit("setUserInfo", res.data);
    return res;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
