// 封装文章相关的接口
import request from '@/utils/request'
// import { getToken } from '@/utils/storage'

// 获取  文章列表
// axios.get(url, {
// params:{...},
// headers:{...}
// })
// 获取 文章列表接口
export const getArticleList = (obj) => {
  // const token = getToken()
  return request.get('interview/query', {
    params: {
      current: obj.current, // 当前页
      pageSize: 10, // 每页数量
      sorter: obj.sorter // 排序字段=>传"weight_desc”获取 推荐、“不传”状取 最新
    }
    // headers: {
    //   // Bearer 后面加一个空格 连接token(令牌)
    //   Authorization: `Bearer ${token}`
    // }
  })
}

// 获取 收藏列表 接口
export const getCollect = (obj) => {
  // const token = getToken()
  return request.get('interview/opt/list', {
    params: {
      optType: 2, // 1点赞 , 2收藏
      pageSize: 10, // 每页数量
      page: obj.page // 当前页
    }
  })
}

// 获取 点赞列表 接口
export const getLike = (obj) => {
  // const token = getToken()
  return request.get('interview/opt/list', {
    params: {
      optType: 1, // 1点赞 , 2收藏
      pageSize: 10, // 每页数量
      page: obj.page // 当前页
    }
  })
}

// 获取文章详情页 getDetail/:id
export const getDetail = id => {
  // const token = getToken()
  return request.get('interview/show', {
    params: {
      id
    }
  })
}

// 单个文章详情 的喜欢
export const updateLike = id => {
  // const token = getToken()
  return request.post('interview/opt', {
    id: id,
    optType: 1 // 设置 喜欢
  })
}
// 单个文章详情 的收藏
export const updateCollect = id => {
  // const token = getToken()
  return request.post('interview/opt', {
    id: id,
    optType: 2 // 设置 收藏
  })
}
