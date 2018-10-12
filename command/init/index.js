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
  console.log(`>> write [ ${fileName} ] done`);
};

const batchFiles = async (context, source) => {
  const { fns } = context;
  const files = await fns.readdir(source, "utf-8");
  files.forEach(fileName => {
    const filePath = path.join(source, fileName);
    write(context, { filePath, fileName });
  });
};

module.exports = async context => {
  const { init } = context;
  if (!init) {
    return;
  }
  const source = path.join(__dirname, "./", init);
  const common = path.join(__dirname, "./", "common");
  batchFiles({ ...context, sourceFolderName: "common" }, common);
  batchFiles(context, source);
};
