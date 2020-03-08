import BreadCrumb from './common/BreadCrumb.vue'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  install: function(Vue) {
    // 挂载自己封装的面包屑导航组件
    Vue.component('bread-crumb', BreadCrumb)
    Vue.component('quill-editor', quillEditor)
  }
}
