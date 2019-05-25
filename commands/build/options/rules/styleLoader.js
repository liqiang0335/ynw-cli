module.exports = ({ extractCSS, load }) => {
  const MiniCssExtractPlugin = load("mini-css-extract-plugin");
  return extractCSS ? MiniCssExtractPlugin.loader : "vue-style-loader";
};
