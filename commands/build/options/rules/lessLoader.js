const fs = require("fs");
const path = require("path");

module.exports = ({ projectPath, themePath, cwd }) => {
  let option = {};
  const localConfig = path.join(projectPath, "/style/theme.json");
  const commonConfig = path.join(process.cwd(), themePath);

  if (themePath && fs.existsSync(commonConfig)) {
    Object.assign(option, require(commonConfig));
  }
  if (localConfig && fs.existsSync(localConfig)) {
    Object.assign(option, require(localConfig));
  }
  const lessOptions = { modifyVars: option };
  return {
    loader: "less-loader",
    options: {
      ...lessOptions,
      javascriptEnabled: true
    }
  };
};
