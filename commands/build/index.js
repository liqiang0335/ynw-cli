const path = require("path");
const load = require("../../util/load");
const webpack = load("webpack");
const cwd = process.cwd();
const axios = require("axios");
const getTimeFromDate = date => date.toTimeString().slice(0, 8);
const {
  YNW_CONFIG_PATH,
  PRODUCTION,
  DEVELOPMENT,
} = require("../../util/const");
const { getPageOption } = require("../../util/fns");
const WebpackDevServer = load("webpack-dev-server");

module.exports = argv => main(argv);

async function main(argv) {
  const package = require("../../package.json");
  const optionDecorator = require("./options/optionDecorator");

  console.log(`> ynw-cli: ${package.version}`.cyan);

  const inputs = await parseInput(argv);
  beforeOption(inputs);
  const options = optionDecorator(createWebpackOption(inputs));
  beforeCompiler(inputs, options);
  run(inputs, options);
}

async function parseInput(argv) {
  const { build, env } = argv;
  const defaultOption = {
    target: "web",
    env: "dev",
    port: 9999,
    host: "127.0.0.1",
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
  const distPath =
    (options.dist && path.join(cwd, options.dist)) ||
    path.join(projectPath + "/dist/");

  if (isHot) {
    options.port = await getValidPort(options.port);
  }

  return Object.assign({}, options, {
    isHot,
    isDev,
    isPro,
    notPro,
    fileName,
    absolutePath,
    projectPath,
    distPath,
  });
}

function beforeOption(inputs) {
  require("./before/compatibility")(inputs);
}

function createWebpackOption(inputs) {
  const entry = require("./options/entry")(inputs);
  const alias = require("./options/alias")(inputs);
  const externals = require("./options/externals")(inputs);
  const plugins = require("./options/plugins")(inputs);
  const rules = require("./options/rules")(inputs);
  const devServer = require("./options/devServer")(inputs);
  const publicPath = require("./options/publicPath")(inputs);

  const chunkFilename =
    inputs.hash && inputs.isPro && inputs.chunkHash
      ? `${inputs.fileName}.chunk.[chunkhash:5].[name].js`
      : `${inputs.fileName}.chunk.[name].js`;

  const filename =
    inputs.hash && inputs.isPro && inputs.bundleHash
      ? `[name].bundle.[hash:5].js`
      : `[name].bundle.js`;

  return {
    entry,
    target: inputs.target,
    mode: inputs.isPro ? PRODUCTION : DEVELOPMENT,
    optimization: {
      moduleIds: "named",
    },
    output: {
      filename,
      path: inputs.distPath,
      chunkFilename,
      publicPath,
    },
    resolve: { alias, extensions: [".js", ".vue", ".jsx", ".json"] },
    module: { rules },
    externals,
    plugins,
    devServer,
  };
}

function beforeCompiler(ctx, options) {
  require("./before/createDev")(ctx, options);
  require("./before/log")(ctx, options);
}

function afterCompiler(ctx) {
  return function () {
    const buildTime = getTimeFromDate(new Date());
    const context = { buildTime, ...ctx };
    require("./after/append")(context);
    require("./after/print")(context);
  };
}

const exec = after => (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    return;
  }
  const hasError = stats.hasErrors();
  const buildInfo = stats.toString({
    chunks: false,
    colors: true,
    assets: false,
    chunkModules: false,
    chunks: false,
    children: false,
    maxModules: 1,
  });
  console.log(buildInfo);
  if (!hasError) {
    after(buildInfo);
  }
};

function run(ctx, options) {
  const compiler = webpack(options);

  // 开发模式
  const dev = () =>
    compiler.watch(
      { aggregateTimeout: 300, poll: 1000, ignored: /node_modules/ },
      exec(afterCompiler(ctx))
    );

  // 生产模式
  const pro = () => compiler.run(exec(afterCompiler(ctx)));

  // 热更新模式
  const hot = () => {
    console.log(">>> ~ ptions.devServer", options.devServer);
    const server = new WebpackDevServer(options.devServer, compiler);

    const runServer = async () => {
      console.log("Starting server...");
      await server.start();
    };
    runServer();
  };

  const package = { dev, pro, hot };
  package[ctx.env]();
}

async function getValidPort(port = 9999) {
  const min = port - 20;
  for (let i = port; i >= min; i--) {
    let url = `http://localhost:${i}`;
    const result = await axios
      .get(url)
      .then(() => false)
      .catch(() => true);
    if (result) {
      return Promise.resolve(i);
    }
  }
}
