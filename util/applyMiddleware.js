const compose = (...fn) => fn.reduce((a, b) => (...args) => b(a(...args)));
module.exports = function(api, middlewares) {
  const chain = middlewares.map(item => item(api));
  return compose(...chain);
};
