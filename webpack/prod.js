const { resolve } = require('path');

const { config, plugins, getRules } = require('./common');

module.exports = {
  ...config,
  plugins,
  mode: 'production',
  output: {
    path: resolve(__dirname, '..', 'build'),
    filename: 'index.js',
    publicPath: '/',
  },
  module: {
    rules: getRules('prod'),
  },
};
