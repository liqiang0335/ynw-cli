const { toArray } = require("../../../../util/fns");

module.exports = ctx => {
  const { isPro } = ctx;

  const jsLoader = require("./jsLoader")(ctx);
  const lessLoader = require("./lessLoader")(ctx);
  const cssLoader = require("./cssLoader")(ctx);
  const styleLoader = require("./styleLoader")(ctx);
  const sassResource = require("./sass-resources")(ctx);

  const result = [
    { test: /\.vue$/, loader: "vue-loader" },
    { test: /\.css$/, use: [styleLoader, "css-loader"], postcss: true },
    {
      test: /\.less/,
      use: [styleLoader, "css-loader", lessLoader],
      postcss: true
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [styleLoader, cssLoader, "sass-loader"].concat(
        toArray(sassResource)
      ),
      postcss: true
    },
    {
      test: /\.jsx?$/,
      use: jsLoader,
      exclude: /node_modules(?!(\/|\\)_?ynw)/
    },
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

  if (isPro) {
    result
      .filter(it => it.postcss)
      .forEach(it => {
        it.use.push("postcss-loader");
      });
  }

  return result;
};
