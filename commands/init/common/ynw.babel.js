/**
 * ----------------------------------------
 * Common
 * ----------------------------------------
 */
const common = {
  presets: [
    [
      "@babel/env",
      { modules: false, targets: {}, useBuiltIns: "usage", corejs: "3" },
    ],
  ],
};
/**
 * ----------------------------------------
 * React
 * ----------------------------------------
 */
const react = {
  presets: [
    [
      "@babel/env",
      { modules: false, targets: {}, useBuiltIns: "usage", corejs: "3" },
    ],
    "@babel/react",
  ],
  plugins: [
    "webpack-async-module-name",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-dotall-regex",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
  ],
};
/**
 * ----------------------------------------
 * Vue
 * ----------------------------------------
 */
const vue = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        targets: { browsers: ["ie >= 11"] },
        useBuiltIns: "usage",
        corejs: "3",
      },
    ],
  ],
  plugins: [
    "ynw",
    "webpack-async-module-name",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-dotall-regex",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    [
      "component",
      { libraryName: "element-ui", styleLibraryName: "theme-chalk" },
    ],
    ["import", { libraryName: "vant", libraryDirectory: "es", style: true }],
  ],
};

module.exports = { react, vue, common };
