import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import HomeMain from '@/views/home/HomeMain.vue'
import Login from '@/views/login'
import Publish from '@/views/contentmanage/Publish.vue'
import Articles from '@/views/contentmanage/Articles.vue'
import Comment from '@/views/contentmanage/Comment.vue'
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
        path: 'comment',
        component: Comment
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
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
