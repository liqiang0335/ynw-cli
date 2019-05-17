const fs = require("fs");
const path = require("path");

module.exports = ({ projectPath }) => {
  const resources = [];

  const localPath = path.join(projectPath, "/style/var.scss");
  if (fs.existsSync(localPath)) {
    resources.push(localPath);
  }

  if (resources) {
    return {
      loader: "sass-resources-loader",
      options: { resources }
    };
  }
};
