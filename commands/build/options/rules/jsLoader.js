// babel-loader Option
module.exports = ({ ynwLoader, notHot, isPro, target }) => {
  const { YNW_BABEL_PATH, PACKAGE_JSON } = require("../../../../util/const");
  const { dependencies } = require(PACKAGE_JSON);
  const babelOptions = require(YNW_BABEL_PATH);
  let options = dependencies.react ? babelOptions.react : babelOptions.vue;

  const use = [];

  if (target === "web" && notHot && ynwLoader !== false) {
    use.push("ynw-loader");
  }

  use.push({
    loader: "babel-loader",
    options
  });

  if (isPro) {
    use.push("uglify-template-string-loader");
  }

  return use;
};
