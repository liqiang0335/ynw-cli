const path = require("path");
const load = require("../../util/load");
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

function main(argv) {
  const optionDecorator = require("./options/optionDecorator");
  const inputs = parseInput(argv);
  const options = optionDecorator(createWebpackOption(inputs));
  before(inputs, options);
  run(inputs, options);
}

function parseInput(argv) {
  const { build, env } = argv;
  const defaultOption = {
    target: "web",
    env: "dev",
    port: 9999
  };
  const config = require(YNW_CONFIG_PATH);
  const pageOption = getPageOption(config, build);

  // weight: common < page < cli
  const options = Object.assign(defaultOption, config.common, pageOption, argv);
  const isHot = env === "hot";
  const isDev = env === "dev";
  const isPro = env === "pro";
  const notPro = isDev || isHot;
  const fileName = path.basename(options.entry);
  const absolutePath = path.join(cwd, options.entry);
  const projectPath = path.dirname(absolutePath);
  const distPath = options.dist || path.join(projectPath + "/dist/");

  return Object.assign({}, options, {
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

function createWebpackOption(inputs) {
  const entry = require("./options/entry")(inputs);
  const alias = require("./options/alias")(inputs);
  const externals = require("./options/externals")(inputs);
  const plugins = require("./options/plugins")(inputs);
  const rules = require("./options/rules")(inputs);
  const devServer = require("./options/devServer")(inputs);
  const publicPath = require("./options/publicPath")(inputs);

  const chunkFilename = `${inputs.fileName}.chunk.[name].js`;

  return {
    entry,
    target: inputs.target,
    mode: inputs.isPro ? PRODUCTION : DEVELOPMENT,
    output: {
      filename: inputs.hash ? "[name].bundle.[hash:5].js" : "[name].bundle.js",
      path: inputs.distPath,
      chunkFilename,
      publicPath
    },
    resolve: { alias, extensions: [".js", ".vue", ".jsx"] },
    module: { rules },
    externals,
    plugins,
    devServer
  };
}

function before(ctx, options) {
  require("./before/createDev")(ctx, options);
  require("./before/log")(ctx, options);
}

function after(result) {
  console.log("> after".red);
}

const exec = after => (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    return;
  }
  const info = stats.toJson("minimal");
  const hasError = stats.hasErrors();
  if (hasError) console.error(info.errors);
  if (stats.hasWarnings()) console.warn(info.warnings);
  const result = stats.toString({
    chunks: false,
    colors: true,
    assets: false,
    chunkModules: false,
    chunks: false,
    children: false,
    maxModules: 1
  });
  console.log(result);
  if (!hasError) {
    after(result);
  }
};

function run(ctx, options) {
  const compiler = webpack(options);

  const package = {
    dev: () =>
      compiler.watch({ aggregateTimeout: 300, poll: 1000 }, exec(after)),
    pro: () => compiler.run(exec(after)),
    hot: () => {
      const WebpackDevServer = load("webpack-dev-server");
      const { devServer } = options;
      WebpackDevServer.addDevServerEntrypoints(options, devServer);
      new WebpackDevServer(compiler, devServer).listen(9999, "localhost", () =>
        console.log(`${HOT_URL}`.green)
      );
      setTimeout(() => {
        openBrowser({ url: HOT_URL });
      }, 1000);
    }
  };
  package[ctx.env]();
}
