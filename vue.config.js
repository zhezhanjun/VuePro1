const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'./',
  outputDir:'dist',
  assetsDir:'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap:false,
  devServer: {
    port: 8080,// 设置项目端口号
    // https: false,// 是否开启https
    // hotOnly: false,
    host:"0.0.0.0",//允许所有的主机访问当前项目
    proxy: {
      // 配置跨域
      '/api': { // 正则匹配到以这个开头的时候 就用代理
        target: 'http://www.xxxx.vip',// 指向的是目标服务器
        pathRewrite: { // 路径重写  /api开头的请求会去到target下请求
          '^/api': '',// 替换/api 为空字符
        },
        ws: true,
        changOrigin: true,// 是否开启代理
      }
    },
  },
})
