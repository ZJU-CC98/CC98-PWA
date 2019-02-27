const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const merge = require("webpack-merge")
const common = require("./webpack.common")

module.exports = merge(common, {
  mode: "production",

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
    }),

    new CopyWebpackPlugin([{
        from: 'public/manifest.json',
        to: 'manifest.json'
      },
      {
        from: 'public/icons/',
        to: 'icons/'
      },
    ]),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin()
    ]
  },
})
