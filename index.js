#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const print = require("./util/print");
require("colors");

main();
function main() {
  const folder = path.join(__dirname, "./commands");
  const keys = getCommands(fs.readdirSync(folder));
  const key = getKey();
  if (keys.includes(key)) {
    const { getParams } = require("./util/fns");
    const argv = getParams(process.argv);
    print("用户输入的参数", argv);
    require(`./commands/${key}`)(argv);
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
