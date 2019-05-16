const load = require("./load");
const MiniCssExtractPlugin = load("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");

const createRule = context => {
  const {
    isDev,
    hot,
    extractCSS,
    projectPath,
    cssModules,
    ynwLoader
  } = context;

  const cssLoader = cssModules
    ? {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: "[name]__[local]__[hash:base64:7]"
        }
      }
    : "css-loader";

  const themePath = path.join(projectPath, "/style/theme.json");
  const lessOptions = fs.existsSync(themePath)
    ? { modifyVars: require(themePath) }
    : null;

  const styleLoader = extractCSS
    ? MiniCssExtractPlugin.loader
    : "vue-style-loader";

  const jsloader = {
    test: /\.jsx?$/,
    use: ["babel-loader"],
    exclude: /node_modules(?!(\/|\\)_?ynw)/
  };

  if (!hot) {
    if (ynwLoader !== false) {
      jsloader.use.unshift("ynw-loader");
    }
  }

  if (!isDev) {
    jsloader.use.push("uglify-template-string-loader");
  }

  const result = [
    { test: /\.css$/, use: [styleLoader, "css-loader"] },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [styleLoader, cssLoader, "sass-loader"]
    },
    {
      test: /\.less/,
      use: [
        styleLoader,
        "css-loader",
        {
          loader: "less-loader",
          options: {
            ...lessOptions,
            javascriptEnabled: true
          }
        }
      ]
    },
    jsloader,

    { test: /\.vue$/, loader: "vue-loader" },
    {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)(\?.+)?$/,
      use: [
        {
          loader: "url-loader",
          options: { limit: 200, name: "assets/[name].[hash:6].[ext]" }
        }
      ]
    }
  ];

  // add scss global
  const varsPath = path.join(projectPath, "/style/var.scss");
  if (fs.existsSync(varsPath)) {
    result[1].use.push({
      loader: "sass-resources-loader",
      options: {
        resources: varsPath
      }
    });
  }

  if (!context.isDev) {
    result[0].use.push("postcss-loader");
    result[1].use.push("postcss-loader");
  }

  return result;
};

module.exports = context => option => {
  const rules = createRule(context);
  option.module.rules = rules;
  return option;
};
