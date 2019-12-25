const openBrowser = require("../util/openBrowser");

module.exports = context => {
  const { cors } = context;
  if (!cors) return;
  const params = `--args --disable-web-security  --user-data-dir --allow-file-access-from-files`;
  openBrowser({ params });
};
