const merge = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "development",

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    open: true,
    port: 8000,
    stats: 'errors-only',

    // proxy: {
    //   "/api": {
    //     target: "",
    //     changeOrigin: true,
    //   },
    // },
  },
})
