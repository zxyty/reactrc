"use strict";
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractTextPlugin = new ExtractTextPlugin("[name].css");

module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],
    files: [
      "./node_modules/phantomjs-polyfill/bind-polyfill.js",
      "test/**/*_spec.js"
    ],
    plugins: [
      "karma-webpack",
      "karma-mocha",
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-phantomjs-launcher",
      "karma-coverage",
      "karma-coverage-istanbul-reporter",
      "karma-spec-reporter"
    ],
    // browsers: ["PhantomJS", "Firefox", "Chrome"],
    browsers: ["Chrome"],
    preprocessors: {
      "test/**/*_spec.js": ["webpack"]
    },
    reporters: ["progress", "coverage-istanbul"],
    coverageReporter: {
      dir: "coverage",
      reports: [
        {
          type: "json",
          subdir: ".",
          file: "coverage.json"
        },
        {
          type: "lcov",
          subdir: "."
        },
        { type: "text-summary" }
      ],
      fixWebpackSourcePaths: true
    },
    webpack: {
      plugins: [
        extractTextPlugin,
        new webpack.DefinePlugin({
          __ENV__: JSON.stringify("development")
        })
      ],
      module: {
        rules: [
          {
            test: /\.css|less$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ["css-loader", "less-loader"]
            })
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
              presets: ["es2015", "react", "stage-0", "stage-1"],
              plugins: ["transform-runtime", "transform-decorators-legacy", "syntax-dynamic-import"]
            }
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            use: "url-loader?limit=8192"
          },
          {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: "file-loader?limit=10000&name=/fonts/[name].[ext]"
          },
          {
            test: /\.js$/,
            use: {
              loader: "istanbul-instrumenter-loader",
              options: { esModules: true }
            },
            exclude: /node_modules/,
            enforce: "post"
          }
        ]
      },
      devtool: "eval-source-map",
      mode: "development" //"development", //"production"
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
