module.exports = function(options) {
  if (options.log) {
    console.log("-----------------------------------------------".yellow);
    console.log(options);
    console.log("-----------------------------------------------".yellow);
  }
};
