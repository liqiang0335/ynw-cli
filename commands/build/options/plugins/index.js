const analyzer = require("./analyzer");
const extractCSS = require("./extractCSS");
const splitModules = require("./splitModules");
const copy = require("./copy");
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
  result = result
    .concat(toArray(analyzer(ctx)))
    .concat(toArray(extractCSS(ctx)))
    .concat(toArray(splitModules(ctx)))
    .concat(toArray(dllPlugin(ctx)))
    .concat(toArray(copy(ctx)));

  return result;
};
