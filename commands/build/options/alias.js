const path = require("path");
const cwd = process.cwd();

const absolutePath = alias => {
  const target = {};
  for (var key in alias) {
    target[key] = path.join(cwd, alias[key]);
  }
  return target;
};

module.exports = ({ alias, projectPath }) => {
  return {
    vue$: "vue/dist/vue.esm",
    "@": projectPath,
    ...absolutePath(alias)
  };
};
