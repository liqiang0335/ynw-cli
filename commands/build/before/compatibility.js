const fs = require("fs");
const path = require("path");

module.exports = ({ framework }) => {
  const { YNW_BABEL_PATH, PACKAGE_JSON } = require("../../../util/const");

  if (!fs.existsSync(YNW_BABEL_PATH)) {
    const source = path.join(__dirname, "../../init/common/ynw.babel.js");
    const content = fs.readFileSync(source);
    fs.writeFileSync(YNW_BABEL_PATH, content);
  }

  if (!framework) {
    const package = require(PACKAGE_JSON);
    if (!package.framework) {
      package.framework = "vue";
      fs.writeFileSync(PACKAGE_JSON, JSON.stringify(package));
    }
  }
};
