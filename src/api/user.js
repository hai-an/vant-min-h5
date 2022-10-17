// 这里导入封装的请求模块
import request from '@/utils/request'

// 用户注册模块
export const register = params => {
  return request.post('user/register', {
    username: params.username,
    password: params.password
  })
}
// 用户登录模块
export const login = params => request.post('user/login', params)

// 获取当前用户信息
export const currentUser = () => request.get('user/currentUser')
