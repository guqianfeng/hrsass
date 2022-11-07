import { reqGetBaseInfo, reqGetProfile, reqLogin } from '@/api/user'
import { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const getters = {}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  removeToken(state) {
    state.token = ''
    removeToken()
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, loginForm) {
    const { data } = await reqLogin(loginForm)
    // console.log(res.data.data);
    context.commit('setToken', data)
    return data
  },
  async getUserInfo(context) {
    const { data: data1 } = await reqGetProfile()
    const { data: data2 } = await reqGetBaseInfo(data1.userId)
    const result = {
      ...data1,
      ...data2
    }
    context.commit('setUserInfo', result)
    return result
  },
  async logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    resetRouter()
    context.commit('permission/setRoutes', [], { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
