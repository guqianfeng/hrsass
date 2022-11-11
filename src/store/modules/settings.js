import defaultSettings from '@/settings'
import Cookies from 'js-cookie'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const ThemeColor = 'theme-color'
const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  theme: Cookies.get(ThemeColor) || '#212121'
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
    if (key === 'theme') {
      Cookies.set(ThemeColor, value)
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

