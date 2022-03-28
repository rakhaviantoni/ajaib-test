module.exports = {
  lintOnSave: false,
  css: {
    sourceMap: true,
  },
  devServer: {
    host: 'localhost',
    port: 9000,
  },
  publicPath: process.env.BASE_URL ? process.env.BASE_URL : '/',
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete('pwa');
    config.plugins.delete('workbox');
    config.module.rule('vue').uses.delete('cache-loader');
    config.module.rule('js').uses.delete('cache-loader');
    config.module.rule('ts').uses.delete('cache-loader');
    config.module.rule('tsx').uses.delete('cache-loader');
    config.plugin('html').tap((args) => {
      /* eslint-disable no-param-reassign */
      args[0].title = 'Ajaib Test';
      return args;
    });
    config.module
      .rule('raw')
      .test(/\.txt$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
};
