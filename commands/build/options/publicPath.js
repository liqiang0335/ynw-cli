const path = require("path");

module.exports = ctx => {
  const {
    publicPath,
    envPublicPath,
    distPath,
    cwd,
    dpath,
    epath,
    isDev,
    isHot,
    isPro,
    envPrefix
  } = ctx;

  const distRelative =
    "/" + path.relative(cwd, distPath).replace(/\\+/g, "/") + "/";

  if (isHot) {
    return "/dist/";
  }

  if (dpath) {
    return distRelative;
  }

  if (epath || isDev) {
    return changeSep(
      (envPrefix || "") + (envPublicPath || publicPath || distRelative)
    );
  }

  if (isPro) {
    return publicPath || distRelative;
  }
};

function changeSep(str) {
  return str.replace(/\/+/g, "/").replace(/\\+/g, "\\");
}
