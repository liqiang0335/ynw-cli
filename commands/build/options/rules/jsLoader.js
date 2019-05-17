// babel-loader Option
module.exports = ({ ynwLoader, isHot, isPro, target, targets, browsers }) => {
  const { YNW_BABEL_PATH, PACKAGE_JSON } = require("../../../../util/const");
  const { framework } = require(PACKAGE_JSON);
  const babelConfig = require(YNW_BABEL_PATH);
  const options = framework.react
    ? babelConfig.react
    : framework.vue
    ? babelConfig.vue
    : {};

  // change @babel/env.targets
  try {
    if (options.presets) {
      options.presets[0][1].targets = targets || { browsers };
    }
  } catch (err) {
    console.log("change @babel/env targets fail".red);
  }

  const use = [];
  if (target === "web" && ynwLoader !== false && !isHot) {
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
