module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7878', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}