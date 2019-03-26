const webpackMerage = require("webpack-merge");
const webpack = require("webpack");
const base = require("./base");

module.exports = webpackMerage(base, {
  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify("development")
    }),

    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  optimization: {
    namedModules: true,
    namedChunks: true,
    nodeEnv: "development",
    flagIncludedChunks: false,
    occurrenceOrder: false,
    sideEffects: false,
    usedExports: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity
    },
    noEmitOnErrors: false,
    checkWasmTypes: false,
    minimize: false
  },

  devtool: "cheap-module-eval-source-map", //"eval-source-map", // development ==> eval-source-map,  production ==> source-map

  mode: "development" //"production"
});
