/**
 * - 路径均为相对根目录
 * - 如果报错缺少模块请使用cnpm命令安装
 * - style/var.scss 约定为 scss 全局变量(无需引入)
 * - style/theme.json 约定为antd主题文件(无需引入)
 */
module.exports = {
  gulp: {}, //制作雪碧图配置 { src:"源目录", dist:"存放目录" }
  dll: {}, //加速构建速度时配置{ modules:{libs:['vue','vuex',...]}, dist:"存放目录" },
  /**
   * 通用的配置项
   */
  common: {
    browsers: ["ie >= 9"],
    externals: {}, //指定不打包的库如:{vue:'Vue','vue-router':'Vue-Router'}
    devServer: {}, //webpack-dev-server 选项
    analyzer: false, //生成打包报告(仅生产环境)
    alias: {}, //自动指定了"@"为项目打包目录的别名
    //在测试环境中自动在PublicPath前添加的前缀
    //生产环境(env=pro)会自动去掉
    //如果命令行中使用了"epath"会强制添加
    envPrefix: ""
  },
  /**
   * 具体的配置项(会覆盖相应的通用配置项)
   */
  keys: {
    //配置示例
    demo: {
      extractCSS: false, //提取CSS到单独文件(仅生产环境)
      splitModules: false, //分离第三方模块到单独文件(仅生产环境)
      cssModules: true, //是否启用CSSModules(仅.scss类型文件)
      dllPath: "" //指定使用的dll库(manifest的文件夹路径)
    }
  }
};
