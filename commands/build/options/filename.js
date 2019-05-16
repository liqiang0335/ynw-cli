module.exports = ({ hash }) => {
  return hash ? "[name].bundle.[hash:5].js" : "[name].bundle.js";
};
