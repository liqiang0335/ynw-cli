module.exports = function(ctx, options) {
  const { devServer } = options;
  const { isHot } = ctx;
  if (isHot) {
    WebpackDevServer.addDevServerEntrypoints(options, devServer);
    new WebpackDevServer(compiler, devServer).listen(9999, "localhost", () =>
      console.log(`http://127.0.0.1:9999/dev.html`.green)
    );
    const open = require(path.join(__dirname, "./output/open"));
    setTimeout(f => open(ctx), 1000);
    return;
  }

  const package = {
    production: () => compiler.run(launch),
    development: () => compiler.watch(watchOps, launch)
  };
  package[ctx.mode]();
};
