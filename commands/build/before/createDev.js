const fs = require("fs");
const path = require("path");

module.exports = ({ isHot, fileName, projectPath, port, host, createDev }) => {
  const target = path.join(projectPath, "dev.html");
  if (!isHot) return;
  if (createDev === false && fs.existsSync(target)) {
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
    <script src="/dist/${fileName}.bundle.js"></script>
    </body>
    </html>`;

  fs.writeFileSync(target, html);
};
