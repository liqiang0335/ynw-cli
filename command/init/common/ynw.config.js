/**
 * 路径均为相对根目录
 */
module.exports = {
  gulp: { src: "", dist: "" },
  dll: { modules: {} },
  common: {
    // 指定babel转译的的版本
    browsers: ["ie >= 9"],
    devServer: {},
    // 自动指定了 "@" 为入口文件夹的别名
    alias: {},
    // webpack构建后自动上传dist文件夹下面的 *.bundle.js, *.bundle.css 文件
    // 注意：仅在开发或者测试环境使用
    ftpConfig: {
      116: {
        debounceTime: 2000, //上传频率（毫秒）
        username: "",
        port: 22,
        host: "",
        password: "",
        remotePath: "" //重要（确保路径填写正确）
      }
    }
  },
  keys: {
    app: {
      entry: "./app/index", //入口(不写后缀名)
      extractCSS: false, //提取CSS到单独文件(生产环境)
      splitModules: false //分离第三方模块到单独文件(生产环境)
    }
  }
};
