module.exports = ({ cwd, dllPath, isPro }) => {
  if (dllPath && isPro) {
    const dllPaths = Array.isArray(dllPath) ? dllPath : [dllPath];
    return dllPaths.map(item => {
      return new webpack.DllReferencePlugin({
        manifest: path.join(cwd, item, "manifest.json"),
        context: cwd
      });
    });
  }
};
