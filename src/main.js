// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
// 全局状态管理
import { store } from './store/store.js'
import 'iview/dist/styles/iview.css'
import './config/rem'
import '@/config/fetch'

Vue.config.productionTip = false
Vue.use(router)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
