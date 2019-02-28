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
      let target = publicPath || distPath;
      return target;
    },
    hot: () => "/dist/"
  };

  let target = handler[env]();

  // 开发环境强制使用 PublicPath
  if (dpath) {
    target = distPath;
  }

  // 生产环境强制使用 envPublicPath
  if (epath) {
    target = envPublicPath ? envPublicPath : envPrefix + target;
  }

  option.output.publicPath = target;
  return option;
};
