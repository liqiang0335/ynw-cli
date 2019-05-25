const path = require("path");
const cwd = process.cwd();
module.exports = name => require(path.join(cwd, "node_modules", name));
