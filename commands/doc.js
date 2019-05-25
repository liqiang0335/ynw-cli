const openBrowser = require("ynw-cli/util/openBrowser");

module.exports = async ctx => {
  const url = "http://www.jsgaotie.com/hooks/app-web/YNW/pages/_index.html";
  openBrowser({ url });
};
