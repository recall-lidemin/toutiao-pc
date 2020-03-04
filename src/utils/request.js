import axios from 'axios'
import router from '../router'

// 配置 axios 基地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置axios请求拦截器，为所有请求的请求头添加token
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
  return config
}, err => Promise.reject(err))

// 配置axios响应拦截器,处理响应数据，统一处理响应异常
axios.interceptors.response.use(res => {
  return res.data ? res.data : {} // 处理响应数据，只返回data
}, err => {
  // 401状态码，表示用户认证失败，由于导航守卫已经检查过token
  // 这里可能是token失效或者没有带token
  // 解决方案：回到登录页，清除旧token
  if (err.response.status === 401) {
    window.sessionStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
