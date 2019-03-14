const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Glob = require("glob");
const AutoPreFixer = require("autoprefixer");
const CssNaNo = require("cssnano");
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
        collapseWhitespace: false // 删除空白符与换行符
      },
      chunks: ["common", filename]
    };

    r.push(new HtmlWebpackPlugin(conf));
  });
  return r;
})();

for (const k in entryJs) {
  entryJs[k] = [
    entryJs[k],
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=5000"
  ];
}

module.exports = {
  entry: entryJs,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "static")
    // chunkFilename: '[name].js'      // 会增加打包后的大小
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
    modules: ["node_modules"] // 如果要添加要搜索的目录，该目录优先于node_modules/,  默认 ['node_modules']
  },

  // resolveLoader: {
  //   modules: [path.resolve(__dirname, "loaders"), "node_modules"]
  // },

  module: {
    rules: [
      {
        test: /(\.less|\.css)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
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
          },
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader"
        // }
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
      // {
      //   test: /\.mvc$/,
      //   exclude: /node_modules/,
      //   include: [path.resolve(__dirname, "src")],
      //   use: "hello-loader"
      // }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify("development")
    }),

    // 另外需要使用webpack的两个插件
    new webpack.NamedChunksPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ].concat(Htmlplugins),

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
};
