import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FileManagerPlugin from 'filemanager-webpack-plugin';
import lessModules from '@kkt/less-modules';

export default (conf, env, options) => {
  conf = lessModules(conf, env, options);
  conf.output.publicPath = './';

  const regexp = /(ReactRefreshWebpackPlugin)/;
  conf.plugins = conf.plugins.map((item) => {
    if (item.constructor && item.constructor.name && regexp.test(item.constructor.name)) {
      return null;
    }
    return item;
  }).filter(Boolean);

  conf.plugins.push(new CleanWebpackPlugin({
    cleanStaleWebpackAssets: true
  }));

  conf.plugins.push(
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            { source: './chrome-main/manifest.json', destination: './dist/manifest.json' },
            { source: './chrome-main/background.js', destination: './dist/background.js' },
            { source: './chrome-main/osc-logo.png', destination: './dist/osc-logo.png' },
            { source: './src/dev-site/public/icons', destination: './dist/icons' },
          ],
        },
      },
    }),
  );
  return conf;
}
