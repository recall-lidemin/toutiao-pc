import router from '@/router'
// 进度条插件
import progress from 'nprogress'
import 'nprogress/nprogress.css'

// 注册路由导航守卫（前置守卫）
router.beforeEach((to, from, next) => {
  // 开启进度条
  progress.start()
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

// 全局路由后置守卫
router.afterEach(() => {
  // 关闭进度条
  progress.done()
})
