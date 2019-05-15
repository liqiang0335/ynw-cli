/**
 * @param {String} template
 * @param {String} target - 存储目录
 */
module.exports = function(template, target) {
  return new Promise(resolve => {
    const download = require("download-git-repo");
    const ora = require("ora");
    const name = `liqiang0335/template-${template}`;
    const spinner = ora("下载模板中...").start();
    download(name, target, err => {
      spinner.stop();
      if (err) {
        throw new Error("下载模板时出错");
      }
      console.log("OK");
      resolve();
    });
  });
};
