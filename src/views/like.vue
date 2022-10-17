<template>
  <div class="like-page">
    <van-nav-bar fixed title="我的喜欢" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item v-for="(item, i) in list" :key="i" :item="item" />
    </van-list>
  </div>
</template>

<script>
import { getLike } from '@/api/article'

export default {
  name: 'like-page',
  data () {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    async onLoad () {
    // 异步更新数据
      const { data } = await getLike({ page: this.page })
      //  解构数组之后 ,添加对象到 list[]中
      this.list.push(...data.rows)
      this.loading = false // 加载完成
      if (!data.rows.length || this.page > data.pageTotal) {
      // 返回的数组长度 为0, 或者 总页码数<当前q页码数
      // 没有更多数据 可以加载 => finished 为 true
        this.finished = true
      } else {
      // 当前页码数 自加1
        this.page++
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>
