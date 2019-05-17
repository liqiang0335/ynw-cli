const load = require("../../../../util/load");
const webpack = load("webpack");
const VueLoaderPlugin = load("vue-loader/lib/plugin");
const { toArray } = require("../../../../util/fns");

const analyzer = require("./analyzer");
const extractCSS = require("./extractCSS");
const splitModules = require("./splitModules");
const dllPlugin = require("./dll");

module.exports = ctx => {
  let result = [new VueLoaderPlugin()];
  if (ctx.isHot) {
    result.push(new webpack.HotModuleReplacementPlugin());
    result.push(new webpack.NamedModulesPlugin());
  }
  result = result.concat(toArray(analyzer(ctx)));
  result = result.concat(toArray(extractCSS(ctx)));
  result = result.concat(toArray(splitModules(ctx)));
  result = result.concat(toArray(dllPlugin(ctx)));

  return result;
};
