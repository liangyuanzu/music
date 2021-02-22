const jsdom = require('jsdom');

const { JSDOM } = jsdom;

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
      postProcess: (route) => {
        // 预渲染内容写入之前的额外操作
        const reg = /<meta name="viewport".*user-scalable=no">/gi;
        const res = route.html.match(reg);
        route.html = route.html.replace(res[1], '');

        // 1.根据字符串创建一个网页
        const html = new JSDOM(route.html);
        // 2.从创建好的网页中拿到document对象
        const dom = html.window.document;
        // 3.找到对应的元素, 删除对应的元素
        const loadingEle = dom.querySelector('.container');
        dom.body.removeChild(loadingEle);

        route.html = html.serialize();
        return route;
      },
    },
  },
};
