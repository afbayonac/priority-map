const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = (env, argv) => {

  return {
    ...( argv.mode === 'development'
    ? {
      watchpack: true,
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
      }
    }
    : {}
    ),
    mode: 'development',
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
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
          { from: "public" },
        ]
      })
    ]
  }
}
