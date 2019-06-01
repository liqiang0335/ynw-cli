module.exports = ({ extractCSS, isHot, load }) => {
  const style = "vue-style-loader";
  if (isHot) {
    return style;
  }
  const MiniCssExtractPlugin = load("mini-css-extract-plugin");
  return extractCSS ? MiniCssExtractPlugin.loader : style;
};
