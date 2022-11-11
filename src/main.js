import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
// import '@/styles/element-variables.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import request from '@/utils/request'
// import { imgerror, color } from "@/directives";
import * as directives from '@/directives'
import * as filters from '@/filters'

import HrSassUI from '@/components'
Vue.use(HrSassUI)

import Print from 'vue-print-nb'
Vue.use(Print)

// import PageTools from '@/components/PageTools'
// Vue.component('PageTools', PageTools)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明

import i18n from '@/lang'

// 配置ElementUI的中英切换逻辑
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

Vue.prototype.$request = request

// Vue.directive("imgerror", imgerror);
// Vue.directive("color", color);
// for (const key in directives) {
//   // console.log(key, directives[key]);
//   Vue.directive(key, directives[key]);
// }

Object.keys(directives).forEach((key) => Vue.directive(key, directives[key]))
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
