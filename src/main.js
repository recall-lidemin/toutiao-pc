import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.less'
// 导入element-ui组件和样式
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import axios from 'axios'

Vue.use(Element)
// 配置 axios 基地址，挂载到Vue原型对象
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.prototype.$axios = axios
// 配置axios拦截器，为所有请求的请求头添加token
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
