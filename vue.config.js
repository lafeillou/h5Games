module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     new MyAwesomeWebpackPlugin()
  //   ]
  // },
  // 本地浏览的情况下，取消下面这行注释
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('Snap')
      .test(require.resolve('snapsvg/dist/snap.svg.js'))
      .use('imports-loader')
      .loader('imports-loader?this=>window,fix=>module.exports=0')

    config.resolve.alias.set('snapsvg', 'snapsvg/dist/snap.svg.js')
  }
}
