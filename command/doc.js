const openBrowser = require("ynw-cli/util/openBrowser");
const { HOST } = require("../util/const");

module.exports = async context => {
  const { doc, argv } = context;
  if (!doc) return;

  const UTILS_PATH = "https://liqiang0335.github.io/template-utils/#/";
  const CONFIG_PATH = "/config/ynw-doc.json";
  const ERROE_MESSAGE = "未找到相关路径";
  const DEFAULT_NAME = "utils";

  let urls = { utils: UTILS_PATH };
  let name = argv[3] || DEFAULT_NAME;
  let url = urls[name];

  if (!url) {
    const axios = require("axios");
    const { data } = await axios.get(HOST + CONFIG_PATH);
    if (data[name]) {
      url = data[name];
    } else {
      console.log(ERROE_MESSAGE);
      return;
    }
  }

  openBrowser({ url });
};
