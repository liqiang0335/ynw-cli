#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const load = require("./util/load");
const fns = require("./util/fns");
const cwd = process.cwd();
require("./util/aop");
require("colors");

main();
function main() {
  const folder = path.join(__dirname, "./commands");
  const keys = getCommands(fs.readdirSync(folder));
  const key = getKey();
  if (keys.includes(key)) {
    const argv = fns.getParams(process.argv);
    const params = Object.assign({ cwd, load, fns }, argv);
    require(`./commands/${key}`)(params);
  }
}

function getCommands(folder) {
  return folder
    .filter(it => !it.startsWith("."))
    .map(it => it.replace(/\.[a-z]+$/, ""));
}

function getKey() {
  return process.argv[2].match(/^\w+/)[0];
}
