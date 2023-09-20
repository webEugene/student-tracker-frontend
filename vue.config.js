module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : process.env.BASE_URL,
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '^/api/v1': {
        target: process.env.VUE_APP_API_ENDPOINT,
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
    disableHostCheck: true,
  },
};
