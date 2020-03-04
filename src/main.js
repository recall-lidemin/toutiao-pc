import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import '@/assets/css/index.less'
// 导入element-ui组件和样式
import 'element-ui/lib/theme-chalk/index.css'
// 导入路由导航守卫配置文件
import './permission'
// 导入axios配置文件
import axios from './utils/request'

// 注册elementui
Vue.use(Element)

// 挂载axios到Vue原型对象，全局调用
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
