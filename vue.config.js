/**
 * 项目标题
 */
const name = '标题'

const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './', // 基本路径-引用文件的路径
  devServer: {
    open: false, // 是否在浏览器自动打开
    port: 8080, // 打开端口
    host: '0.0.0.0', // 允许外部ip访问
    proxy: { // 开发代理
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: { // api/user/login => /user/login
          [`^${process.env.VUE_APP_BASE_API}`]: ''
        }
      }
    }
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  configureWebpack: (config) => {
    config.name = name
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    } else {
      config.plugins = [
        ...config.plugins,
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      ]
    }
  },
  chainWebpack (config) {
    // 引用路径别名配置
    config.resolve.alias
      .set('@', resolve('src'))
      .set('images', resolve('src/assets/images'))
      .set('css', resolve('src/assets/css'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
  }
}
