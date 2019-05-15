module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: {
          browsers: ["ie >= 9"]
        },
        useBuiltIns: "usage",
        corejs: "3"
      }
    ]
  ],
  plugins: [
    "ynw",
    "webpack-async-module-name",
    "@babel/plugin-transform-runtime",
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ],
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
};
