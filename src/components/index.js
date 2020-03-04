import BreadCrumb from './common/BreadCrumb.vue'

export default {
  install: function(Vue) {
    // 挂载自己封装的面包屑导航组件
    Vue.component('bread-crumb', BreadCrumb)
  }
}
