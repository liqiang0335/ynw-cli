const format = require("date-fns/format");

let counter = 0;
const log = context => {
  const { isDev, browsers } = context;
  const envText = isDev ? "开发环境" : "生产环境";
  const colors = ["green", "blue", "magenta", "cyan"];
  const bg = ["bgGreen", "bgBlue", "bgMagenta", "bgCyan"];
  const index = counter % 4;
  const time = format(new Date(), "HH:mm:ss");
  context.buildTime = time;
  console.log(
    ` ${envText} `[bg[index]],
    `--- ${time} --- (${browsers})`[colors[index]]
  );
  console.log(`---------------------------------------------`);
  counter++;
};

module.exports = context => files => {
  log(context);
  return files;
};
