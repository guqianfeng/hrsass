import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: constantRoutes || []
}
const mutations = {
  setRoutes(state, otherRoutes) {
    state.routes = [...constantRoutes, ...otherRoutes]
  }
}
const actions = {
  filterRoutes(context, menus) {
    const otherRoutes = asyncRoutes.filter(item => menus.includes(item.children[0].name))
    // console.log(otherRoutes)
    context.commit('setRoutes', otherRoutes)
    return otherRoutes
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
