const load = require("../../../util/load");

module.exports = inputs => {
  const { externals, target, isDev } = inputs;
  if (["electron-main", "node"].includes(target)) {
    const nodeExternals = load("webpack-node-externals");
    return [nodeExternals()];
  }
  return isDev ? {} : externals;
};
