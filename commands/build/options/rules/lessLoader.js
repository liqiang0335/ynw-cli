const fs = require("fs");

module.exports = ({ projectPath, themePath }) => {
  const localPath = path.join(projectPath, "/style/theme.json");
  const local = fs.existsSync(localPath) && require(localPath);
  const common = fs.existsSync(themePath) && require(themePath);

  let modifyVars = local || common;
  const lessOptions = modifyVars ? { modifyVars } : null;

  return {
    loader: "less-loader",
    options: {
      ...lessOptions,
      javascriptEnabled: true
    }
  };
};
