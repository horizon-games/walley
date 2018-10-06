const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const shared = require('./shared')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AssetsByTypePlugin = require('webpack-assets-by-type-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const main = [
  'core-js/shim',
  'whatwg-fetch'
]

// const vendor = [
//   'core-js/shim',
//   'global',
//   'history',
//   'mobx',
//   'mobx-little-router',
//   'mobx-little-router-react',
//   'react',
//   'react-dom',
//   'react-helmet',
//   'lodash',
//   'ethers'
// ]

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  target: 'web',
  entry: {
    'main': [...main, './src/index.tsx']//,
    // 'vendor': vendor
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name]-[chunkhash].js',
    chunkFilename: 'bundle.[name]-[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          ecma: 5,
          ie8: false,
          safari10: false,
          compress: {
            dead_code: true,
            unused: true
          },
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        default: false
      }
    },
    runtimeChunk: false,
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true // ModuleConcatenationPlugin
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      memoryLimit: 4096,
      checkSyntacticErrors: true
    }),
    new webpack.DefinePlugin(shared.appEnvVars(`config/app.dist.env`)),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    // new AssetsByTypePlugin({
    //   path: path.join(process.cwd(), 'dist/assets.json')
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '.stats/index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'src/public', to: '.' }
    ])
  ],
  module: {
    rules: [{
      test: /.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~/': path.join(process.cwd(), 'src'),
    },
    plugins: [
      new TsconfigPathsPlugin()
    ]
  }
}
