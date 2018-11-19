module.exports = context => option => {
  const {
    publicPath,
    envPublicPath,
    distPath,
    dpath,
    epath,
    env,
    envPrefix,
    test
  } = context;
  const handler = {
    dev: () => {
      let target = envPublicPath || publicPath || distPath;
      if (envPrefix) {
        target = envPrefix + target;
      }
      return target;
    },
    pro: () => {
      if (test) {
        return envPublicPath;
      }
      return publicPath || distPath;
    },
    hot: () => "/dist/"
  };

  let target = handler[env]();
  if (dpath) {
    target = distPath;
  }
  if (epath) {
    target = envPublicPath;
  }
  option.output.publicPath = target;
  return option;
};
