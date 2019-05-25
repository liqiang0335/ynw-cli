module.exports = options => {
  if (options.target !== "web") {
    console.log("alias of 'require': '__non_webpack_require__'".green);
    options.node = {
      __dirname: false,
      __filename: false
    };
  }

  return options;
};
