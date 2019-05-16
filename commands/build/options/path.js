const path = require("path");
module.exports = ({ dist, projectPath }) => {
  return dist || path.join(projectPath + "/dist/");
};
