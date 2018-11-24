module.exports = {
  proxy: {
    '/p': {    //将www.exaple.com印射为/apis
      target: 'http://202.120.7.205:5000/',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
      },
    },
    '/api': {    //将www.exaple.com印射为/apis
      target: 'http://localhost:5000/',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
      },
    }
  }
}
