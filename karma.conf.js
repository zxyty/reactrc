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
    alias: {},
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
      resolve: {
        enforceExtension: false,
        extensions: [".js", ".json"],
        modules: ["node_modules"],
        alias: {
          "@src": path.resolve(__dirname, "./src"),
          "@constants": path.resolve(__dirname, "./src/constants"),
          "@utils": path.resolve(__dirname, "./src/utils")
        }
      },
      plugins: [
        extractTextPlugin,
        new webpack.DefinePlugin({
          __ENV__: JSON.stringify("production")
        }),
        new webpack.DefinePlugin({
          __MOCK__:
            process.env.SERVER_ENV === "mock"
              ? JSON.stringify({
                  host: process.env.MOCK_H_ENV || "localhost",
                  port: process.env.MOCK_P_ENV || process.env.PORT_ENV || 8080
                })
              : false
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
              plugins: [
                "transform-runtime",
                "transform-decorators-legacy",
                "syntax-dynamic-import"
              ]
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
