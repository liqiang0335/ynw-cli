module.exports = inputs => {
  const { externals, target, isDev, load } = inputs;
  if (["node"].includes(target)) {
    const nodeExternals = load("webpack-node-externals");
    return [nodeExternals()];
  }
  return isDev ? {} : externals;
};
