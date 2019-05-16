const load = require("../../../../util/load");
const OptimizeCssAssetsPlugin = load("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = load("mini-css-extract-plugin");

module.exports = ({ fileName }) => {
  if (!extractCSS) {
    return [];
  }

  const cssMin = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: load("cssnano"),
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  });

  const extractCSS = new MiniCssExtractPlugin({
    filename: `${fileName}.bundle.css`,
    chunkFilename: `${fileName}.[id].css`
  });

  return [cssMin, extractCSS];
};
