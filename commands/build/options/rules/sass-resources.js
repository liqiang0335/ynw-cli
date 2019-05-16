const fs = require("fs");

// add scss global
module.exports = ({ varPath }) => {
  const localPath = path.join(projectPath, "/style/var.scss");
  const local = fs.existsSync(localPath) && require(localPath);
  const common = fs.existsSync(varPath) && require(varPath);
  const resources = local || common;

  if (resources) {
    return {
      loader: "sass-resources-loader",
      options: { resources }
    };
  }
};
