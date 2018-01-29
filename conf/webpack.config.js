const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: paths.entry,
  output: {
    filename: 'js/[hash:8].[name].js',
    path: paths.output,
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
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'img/svg/[name].[hash:8].[ext]',
            },
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
    new CleanWebpackPlugin([paths.output]),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: paths.copyFile,
        },
      ]
    })
  ]
}