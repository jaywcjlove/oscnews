const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const PATH = require('path');

module.exports = {
  plugins: [
    require.resolve('@kkt/plugin-less'),
  ],
  // Modify the webpack config
  config: (conf, { dev, env, ...other }, webpack) => {
    conf = {
      ...conf,
      mode: env === 'prod' ? 'production' : 'development',
      devtool: 'source-map',
      entry: other.appIndex,
      output: {
        filename: 'js/[hash:8].[name].js',
        path: PATH.join(__dirname, 'oscnews'),
      },
      plugins: [
        ...conf.plugins.filter(item => item.constructor && item.constructor.name !== 'HotModuleReplacementPlugin'),
        new CleanWebpackPlugin(['oscnews'], {
          root: process.cwd(),
        }),
        new FileManagerPlugin({
          onEnd: [{
            copy: [
              { source: './chrome-main/manifest.json', destination: './oscnews/manifest.json' },
              { source: './chrome-main/background.js', destination: './oscnews/background.js' },
              { source: './chrome-main/osc-logo.png', destination: './oscnews/osc-logo.png' },
              { source: './src/dev-site/public/icons', destination: './oscnews/icons' },
            ],
          }],
        }),
      ]
    }

    conf = {
      ...conf,
      optimization: {
        ...conf.optimization,
        // https://webpack.js.org/plugins/split-chunks-plugin/
        // splitChunks: {
        // }
      }
    };

    if (env === 'prod') {
      // conf = {
      //   ...conf,
      //   optimization: {
      //     ...conf.optimization,
      //     // https://webpack.js.org/plugins/split-chunks-plugin/
      //     splitChunks: {
      //     }
      //   }
      // };
    }
    return conf;
  },
};
