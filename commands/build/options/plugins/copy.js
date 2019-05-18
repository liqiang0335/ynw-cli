module.exports = ctx => {
  const { load, copy } = ctx;
  if (Array.isArray(copy) && copy.length > 0) {
    const CopyWebpackPlugin = load("copy-webpack-plugin");
    console.log(">>>".red, copy);
    return new CopyWebpackPlugin(copy);
  }
};
