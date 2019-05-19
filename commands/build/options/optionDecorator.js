module.exports = options => {
  if (options.target === "node") {
    options.node = { __dirname: false, __filename: false };
  }

  return options;
};
