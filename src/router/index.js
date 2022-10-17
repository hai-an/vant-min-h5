import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/storage'

// 一级路由
import Layout from '@/views/layout'
// import Register from '@/views/register'
// import Detail from '@/views/detail'
// import Login from '@/views/login'
// 二级路由
// import Article from '@/views/article'
// import Collect from '@/views/collect'
// import Like from '@/views/like'
// import User from '@/views/user'

// 路由懒加载
// 异步组件的写法，配合路由使用，该组件不会直接加载，会在路由被解析时才加载
const Article = () => import('@/views/article')
const Collect = () => import('@/views/collect')
const Like = () => import('@/views/like')
const Register = () => import('@/views/register')
const Detail = () => import('@/views/detail')
const Login = () => import('@/views/login')
const User = () => import('@/views/user')
Vue.use(VueRouter)
// 路由规则表
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/article',
    children: [
      {
        path: '/article',
        component: Article
      },
      {
        path: '/collect',
        component: Collect
      },
      {
        path: '/like',
        component: Like
      },
      {
        path: '/user',
        component: User
      }
    ]
  },
  { path: '/detail/:id', component: Detail },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})
// 核心逻辑:
// 1. 判断用户有没有 token ,有 token 直接放行
// 2.没有 token ,如果是去 白名单 的页面 放行
// 3.没有 token, 如果是去要 权限的页面,直接拦截的 登录页面
// 路由访问拦截

// 每个路由即将被访问匹配时,都会调用 beforeEach 的回调函数
// 1.to: 往哪里去,要去的路由信息对象(路径,参数...)
// 2.from: 从哪里来,从哪个地址(页面)过来的
// 3.next是否放行
//  (1) next() 放行
//  (2) next(path) 拦截某路由路径

// 白名单
const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
// 导航守卫存在的意义: 可以加拦截判断
  // 1.判断用户有没有 token,如果有,直接放行
  // 2.没有token, 去的是白名单的页面(登录,注册),这些不拦截
  // 2.没有token, 去的是要授权的页面,统一 拦截到 登录页面

  if (getToken()) {
    console.log('大佬,里面请 vip用户区域')
    next()
  } else {
    if (whiteList.includes(to.path)) {
      // 包含白名单中的 路径
      console.log('欢迎,来到白名单区域')
      next()
    } else {
      // 不包含
      console.log('游客无权访问,已为你打开 登录页面')
      next('/login')
    }
  }
  // console.log(to)
  // console.log(from)
})
export default router
