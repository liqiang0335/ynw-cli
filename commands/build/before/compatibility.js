const fs = require("fs");
const path = require("path");

module.exports = () => {
  const { YNW_BABEL_PATH } = require("../../../util/const");

  if (!fs.existsSync(YNW_BABEL_PATH)) {
    const source = path.join(__dirname, "../../init/common/ynw.babel.js");
    const content = fs.readFileSync(source);
    fs.writeFileSync(YNW_BABEL_PATH, content);
  }
};
