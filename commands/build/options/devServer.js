module.exports = ({ isHot, projectPath,host, port, devServer }) => {
  return isHot
    ? Object.assign(
        {
          hot: true,
          inline: true,
          contentBase: projectPath,
          publicPath: "/dist/",
          open: false,
          disableHostCheck: true,
          host,
          port
        },
        devServer
      )
    : {};
};
