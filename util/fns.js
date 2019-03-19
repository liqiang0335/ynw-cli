const fs = require("fs");
const path = require("path");
const util = require("util");

const cwd = process.cwd();
const load = name => require(path.join(cwd, "node_modules", name));

exports.exists = util.promisify(fs.exists);
exports.readFile = util.promisify(fs.readFile);
exports.writeFile = util.promisify(fs.writeFile);
exports.readdir = util.promisify(fs.readdir);
/**
 * 获取命令行的参数
 * dep 等价于 dep=true
 * --dep 等价于 dep=true
 */
exports.getParams = function(arr) {
  const reg = /=|--/i;
  const result = arr
    .filter((_, i) => i > 1)
    .reduce((acc, cur) => {
      if (!reg.test(cur)) {
        cur = `${cur}=true`;
      }
      cur = cur.replace(/--([^\s]+)/, "$1=true");
      const [key, value] = cur.split("=");
      acc[key] = value;
      return acc;
    }, {});
  return result;
};

/**
 * 复制属性
 */
exports.extend = function(source, target) {
  if (!target) return source;
  for (var key in source) {
    if (target[key] !== undefined) {
      source[key] = target[key];
    }
  }
  return source;
};

/**
 * 合并属性
 */
exports.merge = function(source, target) {
  if (source === undefined) {
    source = {};
  }
  for (var key in target) {
    if (target[key] !== undefined) {
      source[key] = target[key];
    }
  }
  return source;
};

/**
 * 下载模板
 * @param <String> template 模板名称后缀
 * @param <String target 保存的路径
 */
exports.download = function(template, target) {
  return new Promise(resolve => {
    target = target || cwd;
    const download = require("download-git-repo");
    const ora = require("ora");

    const spinner = ora("loading...").start();
    download(`liqiang0335/template-${template}`, target, err => {
      spinner.stop();
      if (err) {
        throw new Error("下载模板时出错");
      }
      console.log("OK");
      resolve();
    });
  });
};

////////////////////////////////

exports.cwd = cwd;
exports.load = load;
