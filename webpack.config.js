const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const devBuild = nodeEnv !== 'production';
require('babel-polyfill');

module.exports = {
  mode: nodeEnv,
  entry: {
    contentScripts: path.join(__dirname, 'src/scripts/contentScripts.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts/[name].bundle.js',
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg|ico)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images/',
          publicPath: path => `/assets/images/${path}`,
        },
      },
    ]
  },
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__dirname, 'src', 'manifest.json'),
          to: path.join(__dirname, 'dist'),
        }
      ]
    )
  ]
};