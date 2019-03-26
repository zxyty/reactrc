const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-router-dom",
      "react-redux",
      "redux-persist",
      "react-router-redux",
      "react-loadable",
      "react-intl",
      "classnames",
      "dva-core",
      "dva-loading",
      "qs"
    ]
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../static/dll"),
    filename: "[name].dll.[hash:5].js",
    library: "[name]_library"
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_library",
      path: path.resolve(__dirname, "../static/dll/manifest.json"),
      context: __dirname
    })
  ]
};
