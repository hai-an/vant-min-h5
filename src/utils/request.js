import axios from 'axios'
import router from '@/router'
import { Toast } from 'vant'
import { getToken, delToken } from '@/utils/storage'
// 创建一个新的 axios 实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/' // 基地址
  // timeout: 5000 // 最长等待时间 5s
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
  console.log(config)
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (err) {
  // 对请求错误做些什么
  return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应的数据做点什么
  return response.data
}, function (err) {
  // 对响应错误做些什么
  if (err.response) {
    // 如果是401，单独提示，直接拦截到登录
    if (err.response.status === 401) {
      // 删除 token
      delToken()
      // 给个提示
      Toast('登录已过期,请重新登录!')
      // 跳转到 登录页
      // 组件中获取路由对象：this.$router
      // js文件中获取路由对象：router (导入)
      router.push('/login')
    } else {
      Toast(err.response.data.message)
    }
  }
  return Promise.reject(err)
})

export default request
