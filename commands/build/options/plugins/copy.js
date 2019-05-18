module.exports = ctx => {
  const { load, copy } = ctx;
  if (Array.isArray(copy) && copy.length > 0) {
    const CopyWebpackPlugin = load("copy-webpack-plugin");
    return new CopyWebpackPlugin(copy);
  }
};
