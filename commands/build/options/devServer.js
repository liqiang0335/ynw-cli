const load = require("../../../util/load");

module.exports = ({ isHot, projectPath, devServer }) => {
  return isHot
    ? Object.assign(
        {
          hot: true,
          inline: true,
          contentBase: projectPath,
          publicPath: "/dist/",
          open: true
        },
        devServer
      )
    : {};
};
