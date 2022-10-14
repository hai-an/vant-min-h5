<template>
  <div class="login-page">
    <!-- 导航部分 -->
    <van-nav-bar title="面经登录" />
    <!-- 表单部分 -->
    <van-form @submit="onSubmit">
      <!-- \w 数字,字母,下划线  ;  \d 数字0~9 -->
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '用户名不能为空' },
          { pattern: /^\w{5,}$/, message: '用户名必须不少于5个字符' },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '密码不能为空' },
          { pattern: /^\d{6,}$/, message: '密码必须不少于6个字符' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
      <!-- 注册页 -->
      <!-- <div style="margin: 16px"> -->
      <router-link class="link" to="/register">去注册</router-link>
      <!-- </div> -->
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '@/utils/storage'
export default {
  name: 'login-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      console.log('submit', values)
      const res = await login(values)
      setToken(res.data.token)
      this.$toast.success('登录成功')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
