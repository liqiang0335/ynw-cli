module.exports = function({ log }, options) {
  if (log) {
    console.log("-----------------------------------------------".yellow);
    console.log(options);
    console.log("-----------------------------------------------".yellow);
  }
};
