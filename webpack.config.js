const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  return {
    ...(argv.mode === 'development'
      ? {
          watch: true,
          devServer: {
            static: {
              directory: path.join(__dirname, 'dist')
            },
            compress: true,
            port: 9000
          }
        }
      : {}
    ),
    mode: 'development',
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }, {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        ...(argv.mode === 'production' ? { base: 'https://afbayonac.github.io/priority-treemap/' } : {})
      }),
      new CopyPlugin({
        patterns: [
          { from: 'public' }
        ]
      })
    ]
  }
}
