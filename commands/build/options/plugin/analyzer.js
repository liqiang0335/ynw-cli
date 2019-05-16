const load = require('../../../../util/load')

/** 
 * 包分析插件
*/
module.exports = ({ isPro analyzer}) => {
  if (isPro && analyzer) {
    const { BundleAnalyzerPlugin } = load("webpack-bundle-analyzer");
    return new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "report.html",
      defaultSizes: "parsed",
      openAnalyzer: false,
      generateStatsFile: false,
      statsFilename: "stats.json",
      statsOptions: null,
      logLevel: "info"
    })
  }
};
