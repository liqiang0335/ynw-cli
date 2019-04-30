const openBrowser = require("../util/openBrowser");

module.exports = context => {
  const { cros } = context;
  if (!cros) return;
  const params = `--args --disable-web-security  --user-data-dir --allow-file-access-from-files`;
  openBrowser({ params });
};
