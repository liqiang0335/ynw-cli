/**
 * @param {String} template
 * @param {String} target - 存储目录
 */
module.exports = function(template, target) {
  if (!target) {
    throw new Error("target params is required");
  }
  return new Promise(resolve => {
    const download = require("download-git-repo");
    const ora = require("ora");
    const spinner = ora("Loading...".yellow).start();
    download(`liqiang0335/${template}`, target, err => {
      spinner.stop();
      if (err) {
        throw new Error("下载时出错");
      }
      console.log("完成");
      resolve();
    });
  });
};
