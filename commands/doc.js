const openBrowser = require("ynw-cli/util/openBrowser");

module.exports = async () => {
  const url = "http://app.jsgaotie.com/books/ynw/pages/_index.html";
  openBrowser({ url });
};
