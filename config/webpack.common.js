const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './../dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:8].js'
  },

  module: {
    rules: [{
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
        },
      },
    ]
  },

  resolve: {
    // alias: {

    // }

    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      inject: true,
    }),

    new CopyWebpackPlugin([
      { from: 'public/manifest.json', to: 'manifest.json' },
      { from: 'public/icons/', to: 'icons/' },
    ]),

    // workbox: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
}

