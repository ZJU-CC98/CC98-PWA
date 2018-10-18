const merge = require("webpack-merge")
const prod = require("./webpack.prod")

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(prod, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
})
