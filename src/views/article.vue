<template>
  <div class="article-page">
    <!-- 导航 -->
    <nav class="my-nav van-hairline--bottom">
      <!-- 'weight_desc' 表示 推荐 -->
      <a
        :class="{ active: sorter === 'weight_desc' }"
        href="javascript:;"
        @click="changeSorter('weight_desc')"
        >推荐</a
      >
      <!-- null 表示 最新 -->
      <!-- axios 对于参数为 null 或 undefined ,会默认忽略其参数 -->
      <a
        :class="{ active: sorter === '' }"
        href="javascript:;"
        @click="changeSorter('')"
        >最新</a
      >
      <div class="logo"><img src="@/assets/logo.png" alt="" /></div>
    </nav>

    <!-- 文章区域 -->
    <!-- <keep-alive> -->
    <!-- 避免重新加载浪费资源,影响用户体验 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item v-for="item in list" :key="item.id" :item="item" />
    </van-list>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'

export default {
  name: 'article-page',
  data () {
    return {
      current: 1,
      sorter: 'weight_desc',
      list: [],
      loading: false, // 数据加载状态
      finished: false // 数据加载完成状态
    }
  },
  created () {},
  methods: {
    async onLoad () {
      console.log('数据加载中')
      const res = await getArticleList({
        current: this.current,
        sorter: this.sorter
      })
      // 将数据 push到 list
      // this.list.push(...res.data.rows)
      // 判断 当前页码数 是否 大于 全部的页码数 pageTotal,
      // 大于 => 数据都加载完了,请求回来的都是空的数组
      // 小于等于 => 还有数据可以加载
      if (this.current > res.data.pageTotal) {
        // 全部数据加载完成
        // 请求回来的数据的长度 => 0
        this.finished = true
      } else {
        this.list.push(...res.data.rows) // 解构数组 =>拿数据(对象)
        console.log(this.list)

        // 加载完成后, 更改 loading 为false
        this.loading = false
        // 每次请求之后 ,当前页码+1
        this.current++
      }
    },
    changeSorter (val) {
      // 重置参数
      this.current = 1
      this.sorter = val
      this.list = []
      this.finished = false

      // 发送请求,加载 页面数据
      // 因为是手动 清空list,(即手动加载更多) 也需要手动将 loading 改成 true,表示正在加载中(避免重复触发)
      this.loading = true
      this.onLoad()
    }
  }
}
</script>
<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
