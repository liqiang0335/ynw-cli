const load = require("../../../../util/load");
const MiniCssExtractPlugin = load("mini-css-extract-plugin");

module.exports = ({ extractCSS }) => {
  return extractCSS ? MiniCssExtractPlugin.loader : "vue-style-loader";
};
