const { exec } = require("child_process");

module.exports = function openBrowser({ url = "", params = "", callback }) {
  const handler = {
    darwin: `open -a "Google Chrome" ${url} ${params}`,
    win32: `start chrome ${url} ${params}`
  };

  const platform = process.platform;
  const cmd = handler[platform];
  exec(cmd, err => {
    if (err) console.log(err);
    callback && callback();
  });
};
