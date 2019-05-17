module.exports = function({ log }, options) {
  if (log) {
    console.log(
      "-------------------  WEBPACK CONFIG  ----------------------".yellow
    );
    console.log("> mode".green, options.mode);
    console.log("> entry".green, options.entry);
    console.log("> target".green, options.target);
    console.log("> output".green, options.output);
    console.log("> resolve.alias".green, options.resolve.alias);
    console.log("> externals".green, options.externals);
    console.log("> devServer".green, options.devServer);
    console.log("-----------------------------------------------".yellow);
  }
};
