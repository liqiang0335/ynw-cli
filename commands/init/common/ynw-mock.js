const fs = require("fs");
const path = require("path");

const readFile = name => {
  const file = path.join(__dirname, `./app/mock/${name}.json`);
  return fs.readFileSync(file, "utf-8");
};

const before = function (app) {
  app.get("/local/users", async function (req, res) {
    await sleep(1000);
    res.send(readFile("users.json"));
  });
};

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

module.exports = { before };
