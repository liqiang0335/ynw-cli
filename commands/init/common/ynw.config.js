const { before } = require("./ynw-mock");
module.exports = {
  common: {
    targets: { browsers: ["chrome >= 60"] },
    createDev: false,
    target: "web",
    devServer: {
      before,
      proxy: {
        "/api": {
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
  pages: {},
};
