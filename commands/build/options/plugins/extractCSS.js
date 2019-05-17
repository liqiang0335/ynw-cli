const load = require("../../../../util/load");

module.exports = ({ fileName, extractCSS }) => {
  if (!extractCSS) {
    return [];
  }

  const OptimizeCssAssetsPlugin = load("optimize-css-assets-webpack-plugin");
  const cssMin = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: load("cssnano"),
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  });

  const MiniCssExtractPlugin = load("mini-css-extract-plugin");
  const cssExtract = new MiniCssExtractPlugin({
    filename: `${fileName}.bundle.css`,
    chunkFilename: `${fileName}.[id].css`
  });

  return [cssMin, cssExtract];
};
