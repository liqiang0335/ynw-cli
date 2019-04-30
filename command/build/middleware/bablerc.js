const path = require("path");
const fs = require("fs");
const UTF8 = "utf-8";

module.exports = context => option => {
  const { browsers, cwd } = context;
  const has = Array.isArray(browsers) && browsers.length > 0;
  if (has) {
    const configPath = path.join(cwd, "babel.config.js");

    let content = "";
    if (!fs.existsSync(configPath)) {
      content = fs.readFileSync(
        path.join(__dirname, "../../init/common/babel.config.js"),
        UTF8
      );
    } else {
      content = fs.readFileSync(configPath, UTF8);
    }

    const target = content.replace(/browsers.+/, `browsers: ["${browsers}"]`);
    fs.writeFileSync(configPath, target);
  }
  return option;
};
