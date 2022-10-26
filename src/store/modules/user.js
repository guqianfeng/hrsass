import { reqGetBaseInfo, reqGetProfile, reqLogin } from "@/api/user";
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
  async login(context, loginForm) {
    const { data } = await reqLogin(loginForm);
    // console.log(res.data.data);
    context.commit("setToken", data);
    return data;
  },
  async getUserInfo(context) {
    const { data: data1 } = await reqGetProfile();
    const { data: data2 } = await reqGetBaseInfo(data1.userId);
    const result = {
      ...data1,
      ...data2,
    };
    context.commit("setUserInfo", result);
    return result;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
