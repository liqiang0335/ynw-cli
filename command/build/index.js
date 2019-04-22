/**
 * package
 */
const path = require("path");
const load = require("./middleware/load");
const webpack = load("webpack");
const colors = load("colors");
const WebpackDevServer = load("webpack-dev-server");

const log = (key, value) => console.log(`${key}`.green, value);

const execMiddleware = require("./output");
const optionMiddleware = require("./middleware");
const applyMiddleware = (api, middlewares) => {
  const compose = (...fn) => fn.reduce((a, b) => (...args) => b(a(...args)));
  const chain = middlewares.map(item => item(api));
  return compose(...chain);
};

module.exports = context => {
  main(context);
};

const parseInput = context => {
  const { cwd, env, build } = context;
  const config = require(path.join(cwd, "ynw.config.js"));
  const { extra, common } = config;
  const values = config["keys"][build];

  const entry = context.entry || values.entry;

  const hot = env === "hot";
  const isDev = env !== "pro" ? true : false;
  const isPro = env === "pro";
  const mode = isDev ? "development" : "production";
  const fileName = path.basename(entry);
  const absolutePath = path.join(cwd, entry);
  const projectPath = path.dirname(absolutePath);
  const projectName = path.basename(projectPath);
  const distPath =
    "/" + entry.replace(/^\.[/\\]?/, "").replace(/\w+$/, "") + "/dist/";
  const port = context.port || 9999;

  return {
    ...context,
    ...extra,
    ...common,
    ...values,
    hot,
    isDev,
    isPro,
    mode,
    fileName,
    absolutePath,
    projectName,
    projectPath,
    distPath,
    port
  };
};

const exec = (callback, context) => (err, stats) => {
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

  // output
  if (!hasError) {
    const { fileName } = context;
    //匹配编译的文件列表
    const re = new RegExp(
      `${fileName}\.(bundle|chunk|lib)[^\\s]+?(js|css)`,
      "g"
    );
    const match = result.match(re);
    const set = new Set(match);
    const list = [...set];
    callback(list);
  }
};

const getExternals = ctx => {
  const { externals, target, isDev } = ctx;
  if (["electron-main", "node"].includes(target)) {
    const nodeExternals = load("webpack-node-externals");
    return [nodeExternals()];
  }
  return isDev ? {} : externals;
};

const createOption = ctx => {
  const { hash } = ctx;
  const filename = hash ? "[name].bundle.[hash:5].js" : "[name].bundle.js";

  const externals = getExternals(ctx);

  return {
    mode: ctx.mode,
    entry: { [ctx.fileName]: ctx.absolutePath },
    target: ctx.target || "web",
    output: {
      path: ctx.projectPath + "/dist/",
      filename,
      chunkFilename: `${ctx.fileName}.chunk.[name].js`
    },
    resolve: {
      extensions: [".js", ".vue", ".json", ".jsx"],
      alias: { vue$: "vue/dist/vue.esm" }
    },
    module: {},
    plugins: [],
    externals
  };
};

const main = context => {
  const ctx = parseInput(context);
  const base = createOption(ctx);
  const option = applyMiddleware(ctx, optionMiddleware)(base);
  const launch = exec(applyMiddleware(ctx, execMiddleware), ctx);
  const watchOps = { aggregateTimeout: 300, poll: 1000 };
  const compiler = webpack(option);

  if (ctx.debug) {
    console.log("-----------------------------------------------");
    console.log(ctx);
    console.log("-----------------------------------------------");
    log("mode", option.mode);
    log("entry", option.entry);
    log("target", option.target);
    log("output", option.output.path);
    log("publicPath", option.output.publicPath);
    log("alias", option.resolve.alias);
    log("externals", option.externals);
    console.log("-----------------------------------------------");
    return;
  }

  // hot
  if (ctx.hot) {
    WebpackDevServer.addDevServerEntrypoints(option, option.devServer);
    new WebpackDevServer(compiler, option.devServer).listen(
      ctx.port,
      "localhost",
      f => console.log(`listening on port ${ctx.port}`.green)
    );
    const open = require(path.join(__dirname, "./output/open"));
    setTimeout(f => open(ctx), 2000);
    return;
  }

  const package = {
    production: f => compiler.run(launch),
    development: f => compiler.watch(watchOps, launch)
  };
  package[ctx.mode]();
};
