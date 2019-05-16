module.exports = ({ ynwLoader, notHot, isPro, target }) => {
  const use = [];

  if (target === "web" && notHot && ynwLoader !== false) {
    use.push("ynw-loader");
  }

  use.push("babel-loader");

  if (isPro) {
    use.push("uglify-template-string-loader");
  }

  return use;
};
