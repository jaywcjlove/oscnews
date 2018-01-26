const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[hash:8].[name].js',
    path: path.resolve(__dirname, '../oscnews')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: [/node_modules/],
        enforce: 'pre',
        use: [
          // TODO:禁用require.ensure也不是一种标准的语言特征。
          // 我们等待https://github.com/facebookincubator/create-react-app/issues/2176。
          // { parser: { requireEnsure: false } },
          {
            // 首先运行linter。
            // 在Babel处理js之前做这一点很重要。
            options: {
              // formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              configFile: require.resolve('./.eslintrc.js'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
      },
      {
        // “oneOf”将遍历所有以下加载程序，直到一个符合要求。
        // 当没有加载器匹配时，它将返回到加载程序列表末尾的“file”加载器。
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            exclude: [/node_modules/, /\.(cache)/],
            loader: require.resolve('babel-loader'),
            options: require('./.babelrc'),
          }, {
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
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['oscnews']),
    new HtmlWebpackPlugin({
      title: '',
      template: './src/index.html'
    }),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            { source: "./chrome-main/manifest.json", destination: "./oscnews/manifest.json" },
            { source: "./chrome-main/chrome.background.js", destination: "./oscnews/chrome.background.js" },
            { source: "./chrome-main/osc-logo.png", destination: "./oscnews/osc-logo.png" }
          ]
        },
      ]
    })
  ]
}