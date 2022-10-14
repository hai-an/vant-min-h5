<template>
  <div class="register-page">
    <!-- 导航部分 -->
    <van-nav-bar title="面经注册" />
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
      <van-field
        v-model="rePassword"
        type="password"
        name="rePassword"
        label="确认密码"
        placeholder="确认密码"
        :rules="[
          { required: true, message: '确认密码不能为空' },
          { validator, message: '两次密码不一致' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">注册</van-button>
      </div>
      <!-- 注册页 -->
      <!-- <div style="margin: 16px"> -->
      <router-link class="link" to="/login">有账号,去登录</router-link>
      <!-- </div> -->
    </van-form>
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { register } from '@/api/user'
export default {
  name: 'register-page',
  data () {
    return {
      username: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      // 1.发送 注册的请求
      // 2.成功提示 文案
      // 3.跳转到 登录页
      try {
        await register(values)
        this.$toast.success('注册成功')
        this.$router.push('/login')
      } catch (err) {
        // console.dir(err)
        // this.$toast(err.response.data.message)
      }
    },
    validator (val) {
      if (this.password === this.rePassword) {
        return true
      }
      return false
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
