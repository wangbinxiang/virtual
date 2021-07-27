const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  css: {
    extract: false,
  },
  productionSourceMap: false,
  chainWebpack(config) {
    if (process.env.NODE_ENV === "development") {
      config.entryPoints.clear(); // 清空默认入口
      config.entry("main").add(resolve("./dev-src/main.js")); // 重新设置
    }
  },
};
