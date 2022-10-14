<template>
  <div class="layout-page">
    <!-- 配置路由出口 -->
    <router-view></router-view>
    <!-- 给 van-tabbar 添加 route 属性开启路由模式,通过to 指定跳转的页面地址 -->
    <van-tabbar route>
      <van-tabbar-item to="/article" icon="notes-o">面经</van-tabbar-item>
      <van-tabbar-item to="/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item to="/like" icon="like-o">点赞</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page'
}
</script>

<style lang="less" scoped></style>
