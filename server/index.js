const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("../webpack.config.dev");
const compress = require("compression");
const app = express();
const port = 30001;
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
  // opn('http://localhost:' + port)
  console.log("development: http://localhost:" + port);
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  path: "/__webpack_hmr",
  log: false
});

app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static(process.cwd + "static"));

app.listen(port, () => {});
