const fs = require("fs");
const path = require("path");

module.exports = () => {
  const { YNW_BABEL_PATH, BABELRC } = require("../../../util/const");

  if (fs.existsSync(BABELRC)) {
    console.log(`====================================`.red);
    console.log(`请删除 ".babelrc" 文件, 该配置文件不再使用`.red);
    console.log(`====================================`.red);
  }
  if (!fs.existsSync(YNW_BABEL_PATH)) {
    const source = path.join(__dirname, "../../init/common/ynw.babel.js");
    const content = fs.readFileSync(source);
    fs.writeFileSync(YNW_BABEL_PATH, content);
  }
};
