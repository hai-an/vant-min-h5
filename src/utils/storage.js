// 统一处理所有的 token
const key = 'vant-mobile-user'
export const setToken = (newToken) => {
  localStorage.setItem(key, newToken)
}
export const getToken = () => {
  return localStorage.getItem(key)
}
export const delToken = () => {
  localStorage.removeItem(key)
}
