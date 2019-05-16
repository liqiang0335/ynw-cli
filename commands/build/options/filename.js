module.exports = ({ hash, isHot, absolutePath, port }) => {
  if (isHot) {
    return [
      `webpack-dev-server/client?http://127.0.0.1:${port}/`,
      "webpack/hot/dev-server",
      absolutePath
    ];
  }
  return hash ? "[name].bundle.[hash:5].js" : "[name].bundle.js";
};
