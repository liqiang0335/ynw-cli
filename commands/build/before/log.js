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
  console.log("> target".green, options.target);
  console.log("> output".green, options.output);
  console.log("> alias".green, options.resolve.alias);
  console.log("> externals".green, options.externals);
  console.log("> devServer".green, options.devServer);
  console.log("> devServer".green, options.devServer);

  try {
    const babelOption = options.module.rules
      .filter(it => it.test.test("demo.jsx"))[0]
      .use.filter(it => it.loader)[0].options.presets;
    console.log("> babel".green, babelOption);
    console.log("> targets".green, babelOption[0][1].targets);
  } catch (err) {
    console.log("> babel".green, "get fail".red);
  }

  console.log("-----------------------------------------------".yellow);
}
