const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[hash:8].[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: [/node_modules/, /\.(cache)/],
        loader: require.resolve('babel-loader'),
        options: require('./.babelrc'),
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        loader: require.resolve('file-loader')
      }, {
        test: /\.(css|less)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[name]-[hash:base64:5]',
              importLoaders: 1,
            },
          },
          require.resolve('less-loader'),
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '',
      template: 'src/index.html'
    }),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            { source: "./chrome-main/manifest.json", destination: "./dist/manifest.json" },
            { source: "./chrome-main/chrome.background.js", destination: "./dist/chrome.background.js" },
            { source: "./chrome-main/osc-logo.png", destination: "./dist/osc-logo.png" }
          ]
        },
      ]
    })
  ]
}