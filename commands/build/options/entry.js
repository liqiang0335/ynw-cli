module.exports = ({ isHot, absolutePath, fileName,  port }) => {
  if (isHot) {
    return {
      [fileName]: [
        `webpack-dev-server/client?http://127.0.0.1:${port}/`,
        "webpack/hot/dev-server",
        absolutePath
      ]
    };
  }
  return {
    [fileName]: absolutePath
  };
};
