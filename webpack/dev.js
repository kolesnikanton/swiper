const { config, plugins, getRules } = require('./common');

module.exports = {
  ...config,
  plugins,
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: getRules(),
  },
};
