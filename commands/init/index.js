const path = require("path");
const fs = require("fs");
const download = require("../../util/download");

const writeFiles = async source => {
  const files = fs.readdirSync(source, "utf-8");
  files.forEach(fileName => {
    const filePath = path.join(source, fileName);
    //..
  });
};

module.exports = async context => {
  const COMMON_PATH = path.join(__dirname, "./common");
  setPackage(context);
  writeFiles();
};

async function setPackage({ init, cwd }) {
  const PACKAGE_PATH = path.join(cwd, "package.json");
  const { devDependencies } = fs.existsSync(PACKAGE_PATH)
    ? {}
    : downTemplate(init);

  const package = require(PACKAGE_PATH);
  package.framework = init;
  Object.assign(package.devDependencies, devDependencies);
  fs.writeFileSync(PACKAGE_PATH, JSON.stringify(package));
}

async function downTemplate(name) {
  const axios = require("axios");
  await download(`init-${name}`);
  const remote = await axios.get(
    "https://www.jsgaotie.com/config/ynw-cli.json"
  );
  return remote.data;
}
