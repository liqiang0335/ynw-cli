const path = require("path");
let gulp, spritesmith;

module.exports = context => {
  const { fns } = context;
  fns.load("colors");
  gulp = fns.load("gulp");
  spritesmith = fns.load("gulp.spritesmith");
  main();
};

function main() {
  const cwd = process.cwd();
  const config = require(path.join(cwd, "./ynw.config.js"));
  let gulpConfig = config.gulp;
  if (!gulpConfig) {
    console.log(`ynw.config未配置gulp:{src,dist}参数`.red);
    return;
  }

  const cssTemplate = images => images.sprites.map(transfer).join("");
  const spriteData = gulp.src(gulpConfig.src + "/*.*").pipe(
    spritesmith({
      imgName: "sprite.png",
      cssName: "sprite.css",
      padding: 10,
      cssTemplate
    })
  );
  spriteData.pipe(gulp.dest(gulpConfig.dist));

  function transfer(item) {
    const name = item.name;
    const bg = item.escaped_image;
    const x = item.px.offset_x;
    const y = item.px.offset_y;
    const w = item.px.width;
    const h = item.px.height;
    return `
    .sp-${name}
  { background-image: url(./${bg});
     background-position: ${x} ${y};
     width: ${w};height: ${h};}
  `;
  }
}
