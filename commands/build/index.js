/**
 * package
 */
const path = require("path");
const load = require("../../util/load");
const webpack = load("webpack");
const WebpackDevServer = load("webpack-dev-server");
const print = require("../../util/print");
const cwd = process.cwd();
const {
  YNW_CONFIG_PATH,
  PRODUCTION,
  DEVELOPMENT
} = require("../../util/const");

module.exports = argv => main(argv);

const parseInput = argv => {
  const { build, env } = argv;
  const config = require(YNW_CONFIG_PATH);
  const pageOption = getPageOption(config, build);

  // 权重: common < page < cli
  const options = Object.assign(config.common, pageOption, argv);
  const isHot = env === "hot";
  const isDev = env === "dev";
  const isPro = env === "pro";
  const notPro = isDev || isHot;
  const fileName = path.basename(options.entry);
  const absolutePath = path.join(cwd, options.entry);
  const projectPath = path.dirname(absolutePath);

  const result = Object.assign({}, options, {
    isHot,
    isDev,
    isPro,
    notPro,
    fileName,
    absolutePath,
    projectPath
  });

  print("用户配置的参数", result);
};

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
  const outputPath = require("./options/path")(inputs);
  const alias = require("./options/alias")(inputs);
  const externals = require("./options/externals")(inputs);
  const plugins = require("./options/plugins")(inputs);
  const rules = require("./options/rules")(inputs);
  const chunkFilename = `${inputs.fileName}.chunk.[name].js`;

  return {
    mode: inputs.isPro ? PRODUCTION : DEVELOPMENT,
    entry: { [inputs.fileName]: inputs.absolutePath },
    target: inputs.target || "web",
    output: { filename, path: outputPath, chunkFilename },
    resolve: { alias, extensions: [".js", ".vue", ".jsx"] },
    module: { rules },
    externals,
    plugins
  };
}

function main(argv) {
  const inputs = parseInput(argv);
  const optionDecorator = require("./options/optionDecorator");
  let options = optionDecorator(createWebpackOption(inputs));

  // const option = applyMiddleware(ctx, optionMiddleware)(base);
  // const launch = exec(applyMiddleware(ctx, execMiddleware), ctx);
  // const watchOps = { aggregateTimeout: 300, poll: 1000 };
  // const compiler = webpack(option);

  // if (ctx.debug) {
  //   console.log("-----------------------------------------------");
  //   console.log(ctx);
  //   console.log("-----------------------------------------------");
  //   log("mode", option.mode);
  //   log("entry", option.entry);
  //   log("target", option.target);
  //   log("output", option.output.path);
  //   log("publicPath", option.output.publicPath);
  //   log("alias", option.resolve.alias);
  //   log("externals", option.externals);
  //   console.log("-----------------------------------------------");
  //   return;
  // }

  // hot
  // if (ctx.hot) {
  //   WebpackDevServer.addDevServerEntrypoints(option, option.devServer);
  //   new WebpackDevServer(compiler, option.devServer).listen(
  //     ctx.port,
  //     "localhost",
  //     () => console.log(`http://127.0.0.1:9999/dev.html`.green)
  //   );
  //   const open = require(path.join(__dirname, "./output/open"));
  //   setTimeout(f => open(ctx), 2000);
  //   return;
  // }

  // const package = {
  //   production: f => compiler.run(launch),
  //   development: f => compiler.watch(watchOps, launch)
  // };
  // package[ctx.mode]();
}

////////////////////////////////////////////////////////////

function getPageOption(config, key) {
  const option = Object.assign({}, config.pages, config.keys);
  return option[key] || {};
}
