const PATH = require('path');
const FS = require('fs');

const directory = FS.realpathSync(__dirname);
const resolveApp = relativePath => PATH.resolve(directory, relativePath);

module.exports = {
  entry: resolveApp('../src/index.js'),
  output: resolveApp('../oscnews'),
  copyFile: [
    { source: "./chrome-main/manifest.json", destination: "./oscnews/manifest.json" },
    { source: "./chrome-main/background.js", destination: "./oscnews/background.js" },
    { source: "./chrome-main/osc-logo.png", destination: "./oscnews/osc-logo.png" },
    { source: "./src/source/icons", destination: "./oscnews/icons" },
  ]
}