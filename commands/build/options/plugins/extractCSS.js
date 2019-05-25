module.exports = ({ fileName, extractCSS, isHot, isPro, load }) => {
  const result = [];

  if (!extractCSS || isHot) {
    return result;
  }

  const MiniCssExtractPlugin = load("mini-css-extract-plugin");
  result.push(
    new MiniCssExtractPlugin({
      filename: `${fileName}.bundle.css`,
      chunkFilename: `${fileName}.[id].css`
    })
  );

  if (isPro) {
    const OptimizeCssAssetsPlugin = load("optimize-css-assets-webpack-plugin");
    result.push(
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: load("cssnano"),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
    );
  }

  return result;
};
