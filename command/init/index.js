const path = require("path");
const load = require("../build/middleware/load");

const write = async (
  { fns, cwd, sourceFolderName },
  { filePath, fileName }
) => {
  const target = path.join(cwd, fileName);
  if (sourceFolderName == "common" && (await fns.exists(target))) {
    return;
  }
  const content = await fns.readFile(filePath, "utf-8");
  await fns.writeFile(target, content, "utf-8");
};

//批处理写入文件
const addFiles = async (context, source) => {
  const { fns } = context;
  const files = await fns.readdir(source, "utf-8");
  files.forEach(fileName => {
    const filePath = path.join(source, fileName);
    write(context, { filePath, fileName });
  });
};

module.exports = async context => {
  const { init, fns, cwd } = context;
  const axios = require("axios");
  if (!init) {
    return;
  }
  const common = path.join(__dirname, "./common");
  await fns.download(`init-${init}`);
  addFiles({ ...context, sourceFolderName: "common" }, common);

  const REMOTE_PATH = "https://www.jsgaotie.com/config/ynw-cli.json";
  const remote = await axios.get(REMOTE_PATH);
  const packagePath = path.join(cwd, "package.json");
  const package = require(packagePath);
  package.devDependencies = remote.data.devDependencies;
  package.scripts.start = "ynw build=app entry=app/index env=hot";
  fns.writeFile(packagePath, JSON.stringify(package));
};
