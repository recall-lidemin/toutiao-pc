import BreadCrumb from './common/BreadCrumb.vue'
import Cover from './common/Cover.vue'
import SelectAndUpload from './common/SelectAndUpload.vue'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import QuillEditor from 'vue-quill-editor'

export default {
  install: function(Vue) {
    // 挂载自己封装的面包屑导航组件
    Vue.component('bread-crumb', BreadCrumb)
    Vue.use(QuillEditor)
    Vue.component('cover-image', Cover)
    Vue.component('select-image', SelectAndUpload)
  }
}
