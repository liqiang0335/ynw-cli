module.exports = inputs => {
  const { externals, target, isPro, load } = inputs;
  if (["node"].includes(target)) {
    const nodeExternals = load("webpack-node-externals");
    return [nodeExternals()];
  }
  return isPro ? externals : {};
};
