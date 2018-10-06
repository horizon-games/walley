const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const shared = require('./shared')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const express = require('express')

const main = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://0.0.0.0:4000',
  'webpack/hot/only-dev-server',
  'whatwg-fetch',
  './src/index.tsx'
]

module.exports = {
  context: process.cwd(), // to automatically find tsconfig.json
  entry: {
    main: main
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: "/"
  },
  optimization: {
    namedModules: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: true,
      checkSyntacticErrors: true,
      watch: ['./src'] // optional but improves performance (fewer stat calls)
    }),
    new webpack.DefinePlugin(shared.appEnvVars('config/app.dev.env')),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    })
  ],
  module: {
    rules: [{
      test: /.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true
          // projectReferences: true
        }
      }],
      exclude: path.resolve(process.cwd(), 'node_modules'),
      include: [
        path.resolve(process.cwd(), 'src'),
      ]
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192000
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png', '.jpg'],
    alias: {
      '~/': path.join(process.cwd(), 'src')
    },
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    open: false,
    hot: true,
    historyApiFallback: true,
    stats: 'errors-only',
    disableHostCheck: true,
    contentBase: path.resolve(process.cwd(), 'src/public'),
    publicPath: '/'
  }
}
