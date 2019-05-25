const fs = require("fs");
const path = require("path");

module.exports = ({ isHot, fileName, projectPath, port }) => {
  if (!isHot) {
    return;
  }
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="http://127.0.0.1:${port}/webpack-dev-server.js"></script>
    <script src="http://127.0.0.1:${port}/dist/${fileName}.bundle.js"></script>
  </body>
  </html>`;

  const target = path.join(projectPath, "dev.html");
  fs.writeFileSync(target, html);
};
