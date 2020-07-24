# ynw-cli

## Install

```shell
npm i -g ynw-cli
```

## Usage

```bash
# vue template
ynw init=vue

# react template
ynw init=react

# install and package
cnpm i
ynw build=app entry=app/index
```

## Other

- `ynw v` 版本号
- `ynw template=vue` 下载模板
- `ynw cros` : 打开跨域浏览器
- `ynw sprite` : 制作雪碧图
- `ynw rename` : 文件批量重命名
- `ynw doc` : 文档

## 配置选项

- 路径均为相对根目录
- style/var.scss = scss 全局变量 (无需引入)
- style/theme.json = antd 主题文件 (无需引入)

```js
// ynw.config.js
module.exports = {
  gulp: { src: "", dist: "" }, // 雪碧图
  dll: { modules: { libs: ['vue','vuex',...] }, dist:"" }, // DLL
  common: {
    targets: { browsers: ["ie >= 11"] },
    createDev: true, // 是否每次创建 dev.html
    target: "web", //  [web, electron-main, electron-renderer]
    externals: {}, // 不打包的库如:{ vue:'Vue','react-dom':'ReactDOM' }
    devServer: {
      before,
      proxy: {
        "/my-dev": {
          target: "http://www.xxx.com",
          pathRewrite: { "^/my-dev": "" },
          changeOrigin: true,
        },
      },
    },
    port: 9999, // 热更新模式端口
    analyzer: false, // 打包报告
    alias: {
      "@store": "./app/store",
      "@script": "./app/script",
      "@comps": "./app/component",
      "@const": "./app/constant",
      "@hook": "./app/hook",
    },
    envPrefix: "",
    extractCSS: false, // 是否提取CSS
    splitModules: false, // 是否提取库文件
    cssModules: false, // CSS模块化
    dllPath: "", // 文件路径: 查找manifest文件
    themePath: "", // 主题路径: 公用主题配置
    dist: "", // 输出目录: 默认当前项目下 dist 文件夹
    copy: [], // 复制文件: { from ,to }
  },
  /****具体的配置项(覆盖通用项)****/
  pages: {
    // demo为项目文件夹的名称
    demo: {
      extractCSS: true,
    },
  },
};
```
