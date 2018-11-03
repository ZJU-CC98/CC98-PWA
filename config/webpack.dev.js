const merge = require("webpack-merge")
const common = require("./webpack.common")

const fs = require('fs')
const path = require('path')

let envDevConfig = {}
const envExists = fs.existsSync(path.resolve(__dirname, '../.env/dev.js'))

if (envExists) {
  envDevConfig = require('../.env/dev')
}

module.exports = merge(common, {
  mode: "development",

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    port: 9898,
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
}, envDevConfig)
