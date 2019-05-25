module.exports = function(ctx, options) {
  if (ctx.log) {
    log(options);
  }
  console.log("> target".green, options.target);
};

function log(options) {
  console.log("-------------------  WEBPACK  ----------------------".yellow);
  console.log("> mode".green, options.mode);
  console.log("> entry".green, options.entry);
  console.log("> output".green, options.output);
  console.log("> alias".green, options.resolve.alias);
  console.log("> externals".green, options.externals);
  console.log("> devServer".green, options.devServer);
  console.log("-----------------------------------------------".yellow);
}
