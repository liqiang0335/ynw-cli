const fs = require("fs");
const path = require("path");
const cwd = process.cwd();
const arg = process.argv;

function main(prefix) {
  console.log("prefix", prefix);
  const files = fs.readdirSync(cwd).filter(it => /jpe?g|png/.test(it));
  files.forEach((item, i) => {
    const oldName = path.join(cwd, item);
    const ext = path.extname(oldName);
    const index = `${i + 1}`.padStart(2, "0");
    const newName = path.join(cwd, `${prefix}_${index}${ext}`);
    fs.renameSync(oldName, newName);
  });
}

main(arg[arg.length - 1]);
