# 网易云音乐

网易云音乐 web 项目
线上地址: https://music.it666.top

### API

运行此项目需先在本地把 api 接口跑起来, 并且事先需要安装 node 环境

```
1. 将 node 项目 clone 到本地
官方 API 文档: https://binaryify.github.io/NeteaseCloudMusicApi/#/
官方 GitHub 地址: https://github.com/Binaryify/NeteaseCloudMusicApi
2. 安装依赖
cmd 进入项目目录
npm install
3. 运行项目
node app.js
```

也可在 vue.config.js 文件中直接将 devServer 的代理地址直接替换为
https://musicapi.it666.top

### 安装

```
npm install
```

### 运行

```
npm run serve
```

### 技术栈

vue + vuex + vue-router + vue-cli

### 技术点

1. 利用 rem + 视口缩放适配移动端。
2. 使用 postcss-pxtorem 自动将 px 转换成 rem。
3. 通过 .browserslistrc 文件指定需要兼容的浏览器。
4. 使用 fastclick 解决移动端 300 ms 点击延迟问题。
5. 初始化默认的全局样式。
6. 颜色换肤&图片换肤&文字换肤.
7. 使用 router-link 实现 tab 选项卡。
8. 路由懒加载。
9. 图片懒加载。
10. 网络工具类封装。
11. 使用 axios.all 实现并发请求。
12. 滚动组件封装。
13. 使用 swiper 实现 banner 轮播图。
14. 使用 vue-router 管理路由。
15. 使用 vuex 进行状态管理
16. 使用 transition 标签结合 velocity 实现动画。
17. vue 自定义指令。
18. vue 创建使用 plugin。
19. 使用 `<keep-alive>` 缓存组件。
20. 预渲染技术解决 SPA 应用 SEO 难的问题。
21. 使用 vue-meta-info 统一管理 SEO 三大标签。
22. 在 nodejs 通过 jsdom 获取网页节点。
