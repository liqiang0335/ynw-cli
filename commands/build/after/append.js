const fs = require("fs");
const path = require("path");

module.exports = context => {
  const { distPath, isPro, isHot, fileName, buildTime, env, target } = context;

  if (isHot || target !== "web") {
    return;
  }

  const displayTime = isPro ? new Date().toLocaleString("en") : buildTime;

  const file = path.join(distPath, `${fileName}.bundle.js`);
  const content = fs.readFileSync(file, "utf-8");

  const extra = [];
  extra.push(`window.WEBPACK_BUILD_TIME = "${displayTime}";`);
  extra.push(`window.WEBPACK_ENV = "${env}";`);

  fs.writeFileSync(file, content + extra.join(""));
};
