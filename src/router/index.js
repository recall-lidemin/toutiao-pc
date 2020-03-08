import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/home')
const HomeMain = () => import('@/views/home/HomeMain.vue')
const Login = () => import('@/views/login')

const Publish = () => import('@/views/contentmanage/Publish.vue')
const Material = () => import('@/views/contentmanage/Material.vue')
const Articles = () => import('@/views/contentmanage/Articles.vue')
const Comment = () => import('@/views/contentmanage/Comment.vue')

const GraphicData = () => import('@/views/fansmanage/GraphicData.vue')
const FansSurvey = () => import('@/views/fansmanage/FansSurvey.vue')
const FansPhoto = () => import('@/views/fansmanage/FansPhoto.vue')
const FansList = () => import('@/views/fansmanage/FansList.vue')

const Account = () => import('@/views/user/Account.vue')

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
        path: 'publish/:id?',
        component: Publish
      }, {
        path: 'articles',
        component: Articles
      }, {
        // 配置路由表的按需导入方式
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
]

const router = new VueRouter({
  routes
})

export default router
