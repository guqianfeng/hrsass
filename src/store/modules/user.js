import { reqLogin } from "@/api/user";
import { getToken, setToken } from "@/utils/auth";
const state = {
  token: getToken(),
};
const getters = {};
const mutations = {
  setToken(state, newToken) {
    state.token = newToken;
    setToken(newToken);
  },
};
const actions = {
  async login(context, data) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await reqLogin(data);
        // console.log(res.data.data);
        context.commit("setToken", res.data.data);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
