const { isWin, isMac } = require("./const");

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

exports.toArray = function(source) {
  if (Array.isArray(source)) {
    return source;
  }
  if (!source) {
    return [];
  }
  return [source];
};

exports.getPageOption = function(config, key) {
  const option = Object.assign({}, config.pages, config.keys);
  return option[key] || {};
};

exports.upath = url => {
  if (isWin) {
    return url.replace(/\\+/g, "\\\\");
  } else {
    return url.replace(/\\+/g, "/");
  }
};
