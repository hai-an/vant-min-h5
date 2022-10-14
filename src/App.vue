<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import request from '@/utils/request'
import { setToken, getToken } from '@/utils/storage'
export default {
  components: { },
  data () {
    return {
      list: getToken() || []
    }
  },
  methods: {
    async  register () {
      // 注册 账号/密码
      // const { data } = await request.post('user/register', {
      //   username: 'haian002',
      //   password: '123456'
      // })

      // 登录 账号/密码
      const res = await request.post('user/login', {
        username: 'haian002',
        password: '123456'
      })
      setToken(res.data.token)
    }
  },
  created () {
  }
}
</script>
<style lang="less">
// .box{
//   width: 200px;
//   height: 200px;
//   background-color: red;
// }
</style>
