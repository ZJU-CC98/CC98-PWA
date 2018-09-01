const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require("webpack-merge")

const commom = {
  entry: {
    main: './src/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
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
      MANIFEST_PATH: '/manifest.json',
    }),

    new CopyWebpackPlugin([
      { from: 'public/manifest.json', to: 'manifest.json' },
      { from: 'public/icons/', to: 'icons/' },
    ]),

    // workbox: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
    new WorkboxPlugin.GenerateSW({
      swDest: "service-worker.js",
      clientsClaim: true,
      skipWaiting: true
    }),
  ],
}

if (process.env.NODE_ENV === 'development') {
  module.exports = merge(commom, {
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
}

if (process.env.NODE_ENV === 'production') {
  module.exports = merge(commom, {
    mode: "production",

    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  })
}
