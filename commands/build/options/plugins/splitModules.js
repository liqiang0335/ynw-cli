module.exports = context => {
  const { splitModules, load } = context;
  if (!splitModules) {
    return;
  }

  const webpack = load("webpack");
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
