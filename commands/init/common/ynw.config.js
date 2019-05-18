/**
 * - 路径均为相对根目录
 * - 如果报错缺少模块请使用cnpm或yarn命令安装
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
    framework: "", //react/vue 默认从package.json中读取
    targets: { browsers: ["ie >= 11"] }, //配置@babel/env.targets选项
    target: "web", //配置webpack.target选项
    externals: {}, //指定不打包的库如:{vue:'Vue','react-dom':'ReactDOM'}
    devServer: {}, //webpack-dev-server 选项
    port: 9999, //热更新模式服务器的端口
    analyzer: false, //生成打包报告(仅生产环境)
    alias: {}, //自动指定了"@"为项目打包目录的别名
    //在测试环境中自动在PublicPath前添加的前缀
    //生产环境(env=pro)会自动去掉
    //如果命令行中使用了"epath"会强制添加
    envPrefix: "",
    extractCSS: false, //提取CSS到单独文件(仅生产环境)
    splitModules: false, //分离第三方模块到单独文件(仅生产环境)
    cssModules: false, //是否启用CSSModules(仅.scss类型文件)
    dllPath: "", //指定使用的dll库(manifest的文件夹路径)
    themePath: "", //指定antd主题文件路径
    dist: "", //输出目录:默认当前项目下dist文件夹
    copy: [] //复制文件{from,to}
  },
  /**
   * keys下面的字段为具体的配置项(会覆盖相应的通用配置项)
   */
  pages: {
    // 示例: demo为项目文件夹的名称
    demo: {
      extractCSS: true
    }
  }
};
