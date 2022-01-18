module.exports = ({ isHot, projectPath, devServer }) => {
  if (!isHot) return {};
  return Object.assign(
    {
      static: {
        directory: projectPath,
      },
      historyApiFallback: true,
      compress: true,
      allowedHosts: "all",
      hot: true,
      open: true,
    },
    devServer
  );
};
