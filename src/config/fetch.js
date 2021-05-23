import Vue from 'vue'
import axios from 'axios'
// axios.defaults.withCredentials = true
let $axios = axios.create({
  baseURL: process.env.BASE_API,
  // withCredentials: true,
  timeout: 30000000
})
// 设置instance默认
// 注意：这里不能设置默认token
Vue.prototype.$axios = $axios

function ajax (that, params, callback) {
  // params['url'] = '180.76.98.73'
  params['method'] = 'post'
  params['data']['ct'] = Math.floor(new Date().getTime() / 1000)
  return new Promise((resolve, reject) => {
    that
      .$axios(params)
      .then(response => {
        if (response.data.result === 105) {
          that.$router.push({ path: '/login' })
        } else {
          resolve(response.data)
        }
        // let res = response['data']
      })
      .catch(error => {
        // 这里处理404错误，没有网络等通用错误，不抛出到每个页面
        if (error.response) {
        } else if (error.request) {
          // The request was made but no response was received (如12s超时)
          that.$Message.error('服务器无响应')
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error)
        }
      })
  })
}
Vue.prototype.$ajax = ajax
