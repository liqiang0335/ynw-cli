const fs = require("fs");
const path = require("path");

module.exports = ({
  ynwLoader,
  isHot,
  isPro,
  target,
  targets,
  browsers,
  absolutePath,
  framework
}) => {
  const { YNW_BABEL_PATH, PACKAGE_JSON } = require("../../../../util/const");
  const package = require(PACKAGE_JSON);
  const babelConfig = require(YNW_BABEL_PATH);
  const key = framework || package.framework || getFramework(absolutePath);

  if (target == "web") {
    console.log(`> babel-option =>`.green, `${key}`.red);
  }

  const options = babelConfig[key];
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

function getFramework(absolutePath) {
  console.log("> detect framework from entry");
  const file = absolutePath + ".js";
  const content = fs.readFileSync(file, "utf-8");
  if (/import\s+[Vv]ue/.test(content)) {
    return "vue";
  }
  if (/import\s+React/.test(content)) {
    return "react";
  }
  return "common";
}
