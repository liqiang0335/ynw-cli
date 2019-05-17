const path = require("path");
const load = reuqire("../../util/load");
const webpack = load("webpack");
const cwd = process.cwd();
const {
  HOT_URL,
  YNW_CONFIG_PATH,
  PRODUCTION,
  DEVELOPMENT
} = require("../../util/const");
const { getPageOption } = require("../../util/fns");
const openBrowser = require("../../util/openBrowser");

module.exports = argv => main(argv);

function parseInput(argv) {
  const { build, env } = argv;
  const defaultOption = {
    target: "web",
    env: "dev",
    port: 9999,
    dist: "/dist/"
  };
  const config = require(YNW_CONFIG_PATH);
  const pageOption = getPageOption(config, build);

  // 权重: common < page < cli
  const options = Object.assign(defaultOption, config.common, pageOption, argv);
  const isHot = env === "hot";
  const isDev = env === "dev";
  const isPro = env === "pro";
  const notPro = isDev || isHot;
  const fileName = path.basename(options.entry);
  const absolutePath = path.join(cwd, options.entry);
  const projectPath = path.dirname(absolutePath);
  const distPath = options.dist || path.join(projectPath + "/dist/");

  const result = Object.assign({}, options, {
    isHot,
    isDev,
    isPro,
    notPro,
    fileName,
    absolutePath,
    projectPath,
    distPath
  });
}

// const exec = (callback, context) => (err, stats) => {
//   if (err) {
//     console.error(err.stack || err);
//     if (err.details) console.error(err.details);
//     return;
//   }
//   const info = stats.toJson("minimal");
//   const hasError = stats.hasErrors();
//   if (hasError) console.error(info.errors);
//   if (stats.hasWarnings()) console.warn(info.warnings);
//   const result = stats.toString({
//     chunks: false,
//     colors: true,
//     assets: false,
//     chunkModules: false,
//     chunks: false,
//     children: false,
//     maxModules: 1
//   });
//   console.log(result);

//   // output
//   if (!hasError) {
//     const { fileName } = context;
//     //匹配编译的文件列表
//     const re = new RegExp(
//       `${fileName}\.(bundle|chunk|lib)[^\\s]+?(js|css)`,
//       "g"
//     );
//     const match = result.match(re);
//     const set = new Set(match);
//     const list = [...set];
//     callback(list);
//   }
// };

function createWebpackOption(inputs) {
  const filename = require("./options/filename")(inputs);
  const alias = require("./options/alias")(inputs);
  const externals = require("./options/externals")(inputs);
  const plugins = require("./options/plugins")(inputs);
  const rules = require("./options/rules")(inputs);
  const devServer = require("./options/devServer");
  const publicPath = require("./options/publicPath");

  const chunkFilename = `${inputs.fileName}.chunk.[name].js`;

  return {
    mode: inputs.isPro ? PRODUCTION : DEVELOPMENT,
    entry: { [inputs.fileName]: inputs.absolutePath },
    target: inputs.target,
    output: { filename, path: inputs.distPath, chunkFilename, publicPath },
    resolve: { alias, extensions: [".js", ".vue", ".jsx"] },
    module: { rules },
    externals,
    plugins,
    devServer
  };
}

function main(argv) {
  const optionDecorator = require("./options/optionDecorator");
  const inputs = parseInput(argv);
  const options = optionDecorator(createWebpackOption(inputs));
  before(ctx, options);
  run(ctx, options);
}

function before(ctx, options) {
  require("./before/createDev")(ctx, options);
  require("./before/log")(ctx, options);
}

function run(ctx, options) {
  const { devServer } = options;
  const { isHot } = ctx;
  const compiler = webpack(inputs);

  if (isHot) {
    WebpackDevServer.addDevServerEntrypoints(options, devServer);
    new WebpackDevServer(compiler, devServer).listen(9999, "localhost", () =>
      console.log(`${HOT_URL}`.green)
    );
    setTimeout(() => {
      openBrowser({ url: HOT_URL });
    }, 1000);
    return;
  }

  const package = {
    pro: () => compiler.run(options),
    dev: () => compiler.watch({ aggregateTimeout: 300, poll: 1000 }, options)
  };
  package[ctx.env]();
}
