const fs = require("fs");
const path = require("path");

module.exports = ({ projectPath, sassVarPath = "/style/var.scss" }) => {
  const localPath = path.join(projectPath, sassVarPath);
  if (fs.existsSync(localPath)) {
    return {
      loader: "sass-resources-loader",
      options: { resources: localPath },
    };
  }
};
