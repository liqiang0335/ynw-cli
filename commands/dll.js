/**
 * 打包库
 */
const path = require("path");
const colors = require("colors");
const cwd = process.cwd();

module.exports = context => {
  const { dll, fns } = context;
  if (!dll) return;

  const UglifyJSPlugin = fns.load("uglifyjs-webpack-plugin");
  const webpack = fns.load("webpack");
  const config = require(path.join(cwd, "ynw.config.js"));
  const dist = config.dll.dist;
  const modules = config.dll.modules;

  if (!modules) {
    return;
  }

  for (let key in modules) {
    const library = modules[key];
    webpack(createOption({ library, dist, key, env: "dev" })).run(
      exec(r => console.log(`${r}`.green))
    );
    webpack(createOption({ library, dist, key, env: "pro" })).run(
      exec(r => console.log(`${r}`.green))
    );
  }

  function createOption({ key, env, dist, library }) {
    const folder = dist || "dll";
    const target = path.join(cwd, folder, key);
    const mode = env == "dev" ? "development" : "production";
    const config = {
      mode,
      entry: { library },
      output: {
        path: target,
        filename: `${key}.${env}.dll.js`,
        library: "[name]"
      },
      plugins: [
        new webpack.DllPlugin({
          path: target + "/manifest.json",
          name: "[name]",
          context: cwd
        })
      ]
    };

    const createEnv = function(env) {
      return new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
      });
    };

    if (env !== "dev") {
      config.plugins.push(createEnv("production"));
      config.plugins.push(new UglifyJSPlugin());
    } else {
      config.plugins.push(createEnv("development"));
    }
    return config;
  }
};

/////////////////////////////////////////////////////////////

/**
 * Webpack 打包回调
 * @param {Function} callback
 */
const exec = callback => (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    callback(false);
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
  console.log(stats.toString({ chunks: false, colors: true }));
  callback(true);
};
