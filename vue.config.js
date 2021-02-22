module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        },
      ],
    },
  },

  // 预渲染
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ['/', '/recommend', '/singer', '/rank', '/search', '/account', '/detail'],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
    },
  },
};
