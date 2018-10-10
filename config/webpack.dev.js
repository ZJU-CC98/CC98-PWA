const merge = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "development",

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    port: 8000,
    host: '0.0.0.0',
    // open: true,
    stats: 'errors-only',

    // proxy: {
    //   "/api": {
    //     target: "",
    //     changeOrigin: true,
    //   },
    // },
  },
})
