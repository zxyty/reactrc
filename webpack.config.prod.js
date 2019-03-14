const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const IncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AutoPreFixer = require("autoprefixer");
const CssNaNo = require("cssnano");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const Glob = require("glob");
const srcDir = path.resolve(process.cwd(), "src");

// 入口 js
let entryJs = (function() {
  var entryJsFiles = Glob.sync(srcDir + "/entry/*.js");
  var entryJsMap = {};

  entryJsFiles.forEach(function(filePath) {
    var filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );
    entryJsMap[filename] = filePath;
  });

  // entryJsMap["vendor"] = [
  //   "react",
  //   "react-dom",
  //   "redux",
  //   "react-router-dom",
  //   "react-redux"
  // ];

  return entryJsMap;
})();

// 多文件html封装打包
var Htmlplugins = (function() {
  var entryHtml = Glob.sync(__dirname + "/views/*.html");
  var r = [];

  entryHtml.forEach(function(filePath) {
    var filename = filePath.substring(
      filePath.lastIndexOf("/") + 1,
      filePath.lastIndexOf(".")
    );

    var conf = {
      filename: filename + ".html", // 生成的 html 存放路径，相对于 path
      inject: "body",
      template: __dirname + "/views/" + filename + ".html",
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true // 删除空白符与换行符
      },
      chunks: ["common", filename]
    };

    r.push(new HtmlWebpackPlugin(conf));
  });
  return r;
})();

module.exports = {
  entry: entryJs,
  performance: {
    hints: "warning"
  },
  output: {
    pathinfo: false,
    filename: "[name].[chunkhash:8].js",
    path: path.resolve(__dirname, "static")
  },

  // 外部对象
  // 当使用了<script>引入jquery时候需要手动打开这句注释
  /* <script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
  </script> */
  // import jQuery from 'jquery'
  externals: {
    // jquery: 'jQuery'
  },

  resolve: {
    enforceExtension: false,
    extensions: [".js", ".json"],
    modules: ["node_modules"], // 如果要添加要搜索的目录，该目录优先于node_modules/,  默认 ['node_modules']
  },

  module: {
    rules: [
      {
        test: /(\.less|\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        // loader: 'file-loader?limit=8192&name=/images/[name].[ext]'
        use: "url-loader?limit=8192"
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader?limit=10000&name=/fonts/[name].[ext]"
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css"
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, "dll", "manifest.json")
    }),
    new IncludeAssetsPlugin({
      assets: [
        {
          path: "dll",
          glob: "*.js",
          globPath: path.join(__dirname, "dll")
        }
      ],
      append: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "dll"),
        to: path.join(__dirname, "static", "dll")
      }
    ]),

    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      __ENV__: JSON.stringify("production")
    }),

    // 分析打包代码大小
    // new BundleAnalyzerPlugin({ analyzerPort: 30010 })
  ].concat(Htmlplugins),

  // When using the uglifyjs-webpack-plugin you must provide the sourceMap: true option to enable SourceMap support.
  // 压缩js
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
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        common: {
          name: "common",
          test: /node_modules/,
          chunks: "initial",
          priority: -10,
          enforce: true
        }
      }
    },
    noEmitOnErrors: true,
    checkWasmTypes: true,
    minimize: true
  },

  devtool: false, //"cheap-module-source-map", // "source-map", // development ==> eval-source-map,  production ==> source-map

  mode: "production" // "development"
};
