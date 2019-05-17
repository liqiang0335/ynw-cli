const analyzer = require("./analyzer");
const extractCSS = require("./extractCSS");
const splitModules = require("./splitModules");
const dllPlugin = require("./dll");

module.exports = ctx => {
  const { isHot, fns, load } = ctx;
  const toArray = fns.toArray;
  const webpack = load("webpack");
  const VueLoaderPlugin = load("vue-loader/lib/plugin");
  let result = [new VueLoaderPlugin()];
  if (isHot) {
    result.push(new webpack.HotModuleReplacementPlugin());
    result.push(new webpack.NamedModulesPlugin());
  }
  result = result.concat(toArray(analyzer(ctx)));
  result = result.concat(toArray(extractCSS(ctx)));
  result = result.concat(toArray(splitModules(ctx)));
  result = result.concat(toArray(dllPlugin(ctx)));

  return result;
};
