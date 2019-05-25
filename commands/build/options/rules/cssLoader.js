module.exports = ({ cssModules }) => {
  return cssModules
    ? {
        loader: "css-loader",
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: "[name]__[local]__[hash:base64:7]"
        }
      }
    : "css-loader";
};
