const path = require("path");
const Glob = require("glob");
const webpack = require("webpack");
const AutoPreFixer = require("autoprefixer");
const CssNaNo = require("cssnano");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcDir = path.resolve(__dirname, "../src");

// 多文件js入口打包
const entryJs = (function() {
  const entryJsFiles = Glob.sync(srcDir + "/entry/*.js");
  const entryJsMap = {};

  entryJsFiles.forEach(function(filePath) {
    const filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    entryJsMap[filename] =
      process.env.NODE_ENV === "development"
        ? [
            filePath,
            `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`
          ]
        : filePath;
  });

  return entryJsMap;
})();

const Htmlplugins = (function() {
  const entryHtml = Glob.sync(path.resolve(__dirname, "../views/*.html"));
  const r = [];

  entryHtml.forEach(function(filePath) {
    const filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );

    const conf = {
      filename: filename + ".html",
      inject: "body",
      template: path.resolve(__dirname, "../views/" + filename + ".html"),
      minify: {
        removeComments: true,
        collapseWhitespace:
          process.env.NODE_ENV === "development" ? false : true
      },
      chunks: ["common", filename]
    };

    r.push(new HtmlWebpackPlugin(conf));
  });
  return r;
})();

module.exports = {
  entry: entryJs,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../static")
  },
  resolve: {
    enforceExtension: false,
    extensions: [".js", ".json"],
    modules: ["node_modules"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
      "@constants": path.resolve(__dirname, "../src/constants"),
      "@utils": path.resolve(__dirname, "../src/utils")
    }
  },
  plugins: [
    ...Htmlplugins,
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
        test: /(\.less|\.css)$/,
        use: [
          process.env.NODE_ENV === "development"
            ? {
                loader: "style-loader"
              }
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                AutoPreFixer({
                  browsers: ["> 1%", "last 5 version"],
                  cascade: false
                }),
                CssNaNo()
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
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
        use: "url-loader?limit=8192&name=images/[name].[hash:5].[ext]"
      },
      // {
      //   test: /\.html$/,
      //   use: "html-withimg-loader"
      // },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader?limit=10000&name=[path][name].[ext]"
      }
    ]
  }
};
