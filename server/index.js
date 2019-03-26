const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../scripts/dev");
const path = require("path");
const compress = require("compression");
const app = express();
const port = parseInt(process.env.PORT_ENV) || 8080;
const compiler = webpack(webpackConfig);

app.use(compress());

const devMiddleware = webpackDevMiddleware(compiler, {
  quiet: false,
  noInfo: false,
  lazy: false,
  headers: { "Access-Control-Allow-Origin": "*" },
  stats: "errors-only"
});

devMiddleware.waitUntilValid(() => {
  console.log("development: http://localhost:" + port);
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  path: "/__webpack_hmr",
  log: false
});

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(path.join(__dirname, "../static")));

app.listen(port, () => {});
