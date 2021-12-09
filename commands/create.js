const inquirer = require("inquirer");
const path = require("path");
const questions = [
  {
    type: "list",
    name: "template",
    message: "请选择模板",
    choices: ["tablelist"],
  },
];

module.exports = function (ctx) {
  for (let key in handlers) {
    if (ctx[key]) {
      handlers[key](ctx);
      return;
    }
  }
  inquirer.prompt(questions).then(answers => {
    handlers[answers.template](ctx);
  });
};

const handlers = {
  tablelist(ctx) {
    if (!ctx.path) {
      return console.error("请输入path路径参数".red);
    }
    if (!/[\\/]/.test(ctx.path)) {
      return console.error("path路径使用双引号括起来".red);
    }
  },
};
