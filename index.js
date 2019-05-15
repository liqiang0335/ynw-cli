#!/usr/bin/env node

const path = require("path");
const { readdir } = require("./util/fs");
require("colors");

(async function() {
  const folder = path.join(__dirname, "./commands");
  const keys = getCommands(await readdir(folder));
  const key = getKey();
  if (keys.includes(key)) {
    const getParams = require("./util/getParams");
    const context = getParams(process.argv);
    require(`./commands/${key}`)(context);
  }
})();

function getCommands(folder) {
  return folder
    .filter(it => !it.startsWith("."))
    .map(it => it.replace(/\.[a-z]+$/, ""));
}

function getKey() {
  return process.argv[2].match(/^\w+/)[0];
}
