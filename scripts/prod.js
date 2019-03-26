const webpackMerage = require("webpack-merge");
const IncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const base = require("./base");

module.exports = webpackMerage(base, {
  performance: {
    hints: "warning"
  },
  output: {
    pathinfo: false
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),

    new webpack.DefinePlugin({
      __ENV__: JSON.stringify("production")
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, "../static/dll/manifest.json")
    }),
    new IncludeAssetsPlugin({
      assets: [
        {
          path: "dll",
          glob: "*.js",
          globPath: path.resolve(__dirname, "../static/dll")
        }
      ],
      append: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true
        },
        sourceMap: false
      })
    ],
    namedModules: false,
    namedChunks: false,
    nodeEnv: "production",
    flagIncludedChunks: true,
    occurrenceOrder: true,
    sideEffects: true,
    usedExports: true,
    concatenateModules: true,
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true
  },

  devtool: false, //"cheap-module-source-map", // "source-map", // development ==> eval-source-map,  production ==> source-map

  mode: "production" // "development"
});
