import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import HomeMain from '@/views/home/HomeMain.vue'
import Login from '@/views/login'
import Publish from '@/views/contentmanage/Publish.vue'
import Articles from '@/views/contentmanage/Articles.vue'
import Material from '@/views/contentmanage/Material.vue'
import Account from '@/views/user/Account.vue'
import GraphicData from '@/views/fansmanage/GraphicData.vue'
import FansSurvey from '@/views/fansmanage/FansSurvey.vue'
import FansPhoto from '@/views/fansmanage/FansPhoto.vue'
import FansList from '@/views/fansmanage/FansList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    // 配置home页二级路由地址
    children: [
      {
        path: '',
        component: HomeMain
      }, {
        path: 'publish',
        component: Publish
      }, {
        path: 'articles',
        component: Articles
      }, {
        // 配置路由表的按需导入方式
        path: 'comment',
        component: () => import('@/views/contentmanage/Comment.vue')
      }, {
        path: 'material',
        component: Material
      }, {
        path: 'graphic',
        component: GraphicData
      },
      {
        path: 'survey',
        component: FansSurvey
      }, {
        path: 'photo',
        component: FansPhoto
      }, {
        path: 'list',
        component: FansList
      }, {
        path: 'account',
        component: Account
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
