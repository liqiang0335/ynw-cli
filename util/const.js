const cwd = process.cwd();
const path = require("path");
const getPath = name => path.join(cwd, name);
const os = require("os");
const platform = os.platform();
const isWin = platform == "win32";
const isMac = platform == "darwin";

exports.HOST = "http://www.jsgaotie.com";
exports.BABEL_CONFIG_PATH = getPath("babel.config.js");
exports.YNW_BABEL_PATH = getPath("ynw.babel.js");
exports.YNW_CONFIG_PATH = getPath("ynw.config.js");
exports.PACKAGE_JSON = getPath("package.json");
exports.PRODUCTION = "production";
exports.DEVELOPMENT = "development";
exports.isWin = isWin;
exports.isWin = isMac;
