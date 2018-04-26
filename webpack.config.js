const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
// const CopyWebpackPlugin = require("copy-webpack-plugin")
// const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {

  mode: "development",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },

  // devtool: 'eval-source-map',

  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      favicon: './public/98icon.ico',
      inject: true,
    }),
  ],

  // webpack-dev-server config
  // "--hot" and "--inline" should be passed in package.json to enable HMR
  devServer: {
    historyApiFallback: true,
    open: true,
  },
}
