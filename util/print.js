/**
 * @param level - 日志输出级别
 */
module.exports = (desc, value, level) => {
  console.log("------------------------------------------");
  console.log(`> ${desc} :`.green, value);
};
