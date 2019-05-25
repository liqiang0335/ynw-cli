let counter = 0;

module.exports = ctx => {
  const { isDev, browsers, targets, buildTime } = ctx;
  const envText = isDev ? "开发环境" : "生产环境";
  const colors = ["green", "blue", "magenta", "cyan"];
  const bg = ["bgGreen", "bgBlue", "bgMagenta", "bgCyan"];
  const index = counter % 4;

  const browserValue =
    (targets &&
      (targets.browsers || (targets.node && "node:" + targets.node))) ||
    browsers;

  console.log(
    ` ${envText} `[bg[index]],
    `--- ${buildTime} --- (${browserValue})`[colors[index]]
  );
  console.log(`---------------------------------------------`);
  counter++;
};
