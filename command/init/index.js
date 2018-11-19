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
const batchFiles = async (context, source) => {
  const { fns } = context;
  const files = await fns.readdir(source, "utf-8");
  files.forEach(fileName => {
    const filePath = path.join(source, fileName);
    write(context, { filePath, fileName });
  });
};

module.exports = async context => {
  const { init, fns } = context;
  if (!init) {
    return;
  }
  // const common = path.join(__dirname, "./common");
  // batchFiles({ ...context, sourceFolderName: "common" }, common);
  fns.download(`init-common`);
  fns.download(`init-${init}`);
};
