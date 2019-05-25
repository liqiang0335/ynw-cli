const fs = require("fs");
const path = require("path");

module.exports = ({ projectPath }) => {
  const localPath = path.join(projectPath, "/style/var.scss");
  if (fs.existsSync(localPath)) {
    console.log("> use Sass Global Variable".green);
    return {
      loader: "sass-resources-loader",
      options: { resources: localPath }
    };
  }
};
