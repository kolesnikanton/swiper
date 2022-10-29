const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Demo/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/Demo/index.html',
    }),
  ],
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
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
        ],
      },
    ],
  },
};
