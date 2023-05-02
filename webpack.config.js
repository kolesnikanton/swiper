// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/Demo/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
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
      { test: /\.tsx?$/, use: 'ts-loader' },
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
