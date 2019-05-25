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
  const { template, cwd } = context;
  const inquirer = require("inquirer");

  inquirer.prompt(question).then(answers => {
    const { to } = answers;
    const target = path.join(cwd, to);
    const exists = fs.existsSync(target);
    if (exists) {
      generator(template, target);
    } else {
      console.log("目录不存在".red);
    }
  });
};

function generator(template, target) {
  const download = require("download-git-repo");
  const ora = require("ora");

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
