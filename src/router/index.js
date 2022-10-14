import Vue from 'vue'
import VueRouter from 'vue-router'

// 一级路由
import Layout from '@/views/layout'
import Detail from '@/views/detail'
import Register from '@/views/register'
import Login from '@/views/login'
// 二级路由
import Article from '@/views/article'
import Collect from '@/views/collect'
import Like from '@/views/like'
import User from '@/views/user'

Vue.use(VueRouter)

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

export default router
