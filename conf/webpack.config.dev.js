const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config');
const paths = require('./paths');

module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    contentBase: paths.output,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      template: './src/index.html',
    }),
  ],
});
