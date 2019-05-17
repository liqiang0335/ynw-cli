const fs = require("fs");
const path = require("path");

module.exports = context => {
  const { distPath, isHot, fileName, buildTime, env, target } = context;

  if (isHot || target !== "web") {
    return;
  }

  const file = path.join(distPath, `${fileName}.bundle.js`);
  const content = fs.readFileSync(file, "utf-8");

  const extra = [];
  extra.push(`window.WEBPACK_BUILD_TIME = "${buildTime}";`);
  extra.push(`window.WEBPACK_ENV = "${env}";`);

  fs.writeFileSync(file, content + extra.join(""));
};
