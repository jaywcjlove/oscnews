import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';

export const loaderOneOf = [
  require.resolve('@kkt/loader-less')
];

export default (conf) => {
  conf.output.publicPath = './';
  const regexp = /(HotModuleReplacementPlugin)/;
  conf.plugins = conf.plugins.map((item) => {
    if (item.constructor && item.constructor.name && regexp.test(item.constructor.name)) {
      return null;
    }
    return item;
  }).filter(Boolean);

  conf.plugins.push(new CleanWebpackPlugin({
    cleanStaleWebpackAssets: true
  }));
  conf.plugins.push(new FileManagerPlugin({
    onEnd: [{
      copy: [
        { source: './chrome-main/manifest.json', destination: './build/manifest.json' },
        { source: './chrome-main/background.js', destination: './build/background.js' },
        { source: './chrome-main/osc-logo.png', destination: './build/osc-logo.png' },
        { source: './src/dev-site/public/icons', destination: './build/icons' },
      ],
    }],
  }));
  return conf;
}
