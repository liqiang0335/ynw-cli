const path = require("path");
const fs = require("fs");
const download = require("../../util/download");
const cwd = process.cwd();
const axios = require("axios");
const { YNW_CONFIG_PATH, PACKAGE_JSON } = require("../../util/const");

const writeFiles = () => {
  if (fs.existsSync(YNW_CONFIG_PATH)) {
    return;
  }
  const source = path.join(__dirname, "./common");
  const files = fs.readdirSync(source, "utf-8");
  files.forEach(fileName => {
    const filePath = path.join(source, fileName);
    const target = path.join(cwd, fileName);
    fs.createReadStream(filePath).pipe(fs.createWriteStream(target));
  });
};

module.exports = async ({ init }) => {
  download(`template-init-${init}`, cwd);
  writeFiles();
};
