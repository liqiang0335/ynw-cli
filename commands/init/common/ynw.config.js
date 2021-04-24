const { before } = require("./ynw-mock");
module.exports = {
  common: {
    targets: { browsers: ["ie >= 11"] },
    createDev: true,
    target: "web",
    devServer: {
      before,
      proxy: {
        "/mydev": {
          target: "http://www.xxx.com",
          pathRewrite: { "^/mydev": "" },
          changeOrigin: true,
        },
      },
    },
    host: "127.0.0.1",
    port: 9999,
    analyzer: false,
    alias: {
      "@store": "./app/store",
      "@script": "./app/script",
      "@comps": "./app/component",
      "@const": "./app/constant",
      "@hook": "./app/hook",
    },
    envPrefix: "",
    extractCSS: true,
    splitModules: false,
    cssModules: true,
    dist: "",
    publicPath: "./",
  },
  pages: {
    demo: {
      extractCSS: true,
    },
  },
};
