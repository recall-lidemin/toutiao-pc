import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.less'
// 导入element-ui组件和样式
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
