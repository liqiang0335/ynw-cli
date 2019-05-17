module.exports = ctx => {
  const {
    publicPath,
    envPublicPath,
    distPath,
    dpath,
    epath,
    isDev,
    isHot,
    isPro,
    envPrefix
  } = ctx;

  if (isHot) {
    return "/dist/";
  }

  if (dpath) {
    return distPath;
  }

  if (epath || isDev) {
    return envPrefix + (envPublicPath || publicPath || distPath || "./dist/");
  }

  if (isPro) {
    return publicPath || distPath;
  }
};
