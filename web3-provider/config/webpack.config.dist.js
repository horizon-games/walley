const webpack = require('webpack')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const production = process.env.NODE_ENV === 'production'

let entry = {
  'walley-web3-provider': './src/index.ts',
  'walley-web3-provider.min': './src/index.ts'
}
// if (production) {
//   entry = Object.assign({}, entry, {'arcadeum.min': './src/index.ts'});
// }

module.exports = {
  entry,
  output: {
    path: path.join(process.cwd(), 'dist', 'umd'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'walleyProvider',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /.tsx?$/,
      use: [{
        loader: 'ts-loader', options: { transpileOnly: true }
      }],
      exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.join(process.cwd(), 'src')
    }
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
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
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      memoryLimit: 4096,
      checkSyntacticErrors: true,
      tsconfig: './tsconfig.json'
    })
  ]
}
