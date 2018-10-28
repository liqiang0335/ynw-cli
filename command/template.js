const path = require("path");
const fs = require("fs");
const question = [
  {
    name: "to",
    type: "input",
    message: `请输入模板保存路径（相对项目根目录）：`
  }
];

module.exports = async context => {
  const { template, fns, cwd } = context;
  const load = fns.load;
  const inquirer = require("inquirer");
  load("colors");

  inquirer.prompt(question).then(answers => {
    const { to } = answers;
    const target = path.join(cwd, to);
    const exists = fs.existsSync(target);
    if (exists) {
      generator(load, template, target);
    } else {
      console.log("目录不存在".red);
    }
  });
};

function generator(load, template, target) {
  const download = load("download-git-repo");
  const ora = load("ora");

  const spinner = ora("loading...").start();
  download(`liqiang0335/template-${template}`, target, err => {
    spinner.stop();
    if (err) {
      console.log(err);
      return;
    }
    console.log("OK".green);
  });
}
