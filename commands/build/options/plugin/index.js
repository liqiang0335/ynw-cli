const path = require("path");
const load = require("../../../util/load");
const webpack = load("webpack");
const VueLoaderPlugin = load("vue-loader/lib/plugin");

module.exports = context => option => {
  const {
    extractCSS,
    splitModules,
    fileName,
    dllPath,
    cwd,
    isDev,
    analyzer,
    isPro
  } = context;
  option.plugins.push(new VueLoaderPlugin());

  if (splitModules) {
    option.plugins.push(SplitPlugin(context));
  }

  //生产环境添加 DLL 插件
  if (dllPath && !isDev) {
    const dllPaths = Array.isArray(dllPath) ? dllPath : [dllPath];
    dllPaths.forEach(item => {
      option.plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.join(cwd, item, "manifest.json"),
          context: cwd
        })
      );
    });
  }

  if (isPro && analyzer) {
    const { BundleAnalyzerPlugin } = load("webpack-bundle-analyzer");
    option.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "report.html",
        defaultSizes: "parsed",
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: "stats.json",
        statsOptions: null,
        logLevel: "info"
      })
    );
  }

  return option;
};
