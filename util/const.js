const cwd = process.cwd();
const path = require("path");
const getPath = name => path.join(cwd, name);

exports.HOST = "http://www.jsgaotie.com";
exports.HOT_URL = "http://127.0.0.1:9999/dev.html";
exports.BABEL_CONFIG_PATH = getPath("babel.config.js");
exports.YNW_BABEL_PATH = getPath("ynw.babel.js");
exports.YNW_CONFIG_PATH = getPath("ynw.config.js");
exports.PACKAGE_JSON = getPath("package.json");
exports.PRODUCTION = "production";
exports.DEVELOPMENT = "development";
