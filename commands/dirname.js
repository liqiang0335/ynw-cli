const path = require("path");
module.exports = ctx => {
  const value = path.dirname(__dirname);
  console.log(`>> ${value}`.green);
};
