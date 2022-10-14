import axios from 'axios'
import { Toast } from 'vant'

// 创建一个新的 axios 实例
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/h5/', // 基地址
  timeout: 5000 // 最长等待时间 5s
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
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
    Toast(err.response.data.message)
  }
  return Promise.reject(err)
})

export default request
