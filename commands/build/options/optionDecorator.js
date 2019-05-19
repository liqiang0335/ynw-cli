module.exports = options => {
  if (options.target !== "web") {
    options.node = {
      __dirname: false,
      __filename: false
    };
  }

  return options;
};
