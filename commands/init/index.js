const path = require("path");
const fs = require("fs");
const download = require("../../util/download");
const cwd = process.cwd();

const writeFiles = () => {
  const source = path.join(__dirname, "./common");
  const files = fs.readdirSync(source, "utf-8");
  files.forEach(fileName => {
    const filePath = path.join(source, fileName);
    const target = path.join(cwd, fileName);
    fs.createReadStream(filePath).pipe(fs.createWriteStream(target));
  });
};

module.exports = context => {
  setPackage(context);
  writeFiles();
};

async function setPackage({ init, cwd }) {
  const PACKAGE = path.join(cwd, "package.json");
  const { devDependencies } = fs.existsSync(PACKAGE)
    ? {}
    : await downTemplate(init);
  const package = require(PACKAGE);
  package.framework = init;
  Object.assign(package, { devDependencies });
  fs.writeFileSync(PACKAGE, JSON.stringify(package));
}

async function downTemplate(name) {
  const url = "https://www.jsgaotie.com/config/ynw-cli.json";
  const axios = require("axios");
  await download(`init-${name}`);
  const remote = await axios.get(url);
  return remote.data;
}
