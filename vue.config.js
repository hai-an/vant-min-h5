const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: '/' 默认在 根目录 才可以运行
  publicPath: './', // 设置 在任意目录中 都可以运行, 双击运行

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            blue: '#FA6D1D'
          }
        }
      }
    }
  }
})
