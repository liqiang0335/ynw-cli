const load = require("./load");
const webpack = load("webpack");
const OptimizeCssAssetsPlugin = load("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = load("vue-loader/lib/plugin");
const MiniCssExtractPlugin = load("mini-css-extract-plugin");
const path = require("path");

const SplitPlugin = context => {
  const { fileName } = context;
  return new webpack.optimize.SplitChunksPlugin({
    chunks: "all",
    minSize: 30000, //形成一个新代码块最小的体积
    minChunks: 1, //最小应该被引用的次数
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: "~",
    name: `libs`,
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      },
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      }
    }
  });
};

const cssMin = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: load("cssnano"),
  cssProcessorOptions: { discardComments: { removeAll: true } },
  canPrint: true
});

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

  if (extractCSS) {
    option.plugins.push(cssMin);
    option.plugins.push(
      new MiniCssExtractPlugin({
        filename: `${fileName}.bundle.css`,
        chunkFilename: `${fileName}.[id].css`
      })
    );
  }

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
