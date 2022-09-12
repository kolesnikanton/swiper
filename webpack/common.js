// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const getRules = (env) => ([
  { test: /\.jsx?$/, use: 'babel-loader' },
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: env === 'prod'
              ? '[hash:base64:5]'
              : '[path][name]__[local]',
          },
        },
      },
    ],
  },
]);

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
  }),
];

module.exports = {
  config, plugins, getRules,
};
