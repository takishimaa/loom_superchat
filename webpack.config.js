const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin   = require('write-file-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const devBuild = nodeEnv !== 'production';

module.exports = {
  mode: nodeEnv,
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/scripts/contentScripts.js')
  ],
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
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/scripts/components'),
      Styles: path.resolve(__dirname, 'src/scripts/components/styles'),      
      Containers: path.resolve(__dirname, 'src/scripts/containers'),
      Store: path.resolve(__dirname, 'src/scripts/store'),
      Sagas: path.resolve(__dirname, 'src/scripts/sagas'),
      Modules: path.resolve(__dirname, 'src/scripts/modules'),
      Api: path.resolve(__dirname, 'src/scripts/api'),
      Images: path.resolve(__dirname, 'src/images'),
      Contracts: path.resolve(__dirname, 'src/contracts')
    }
  },
  plugins: [
    new WriteFilePlugin(),
    new webpack.ProvidePlugin({
      'React': 'react',
      'Component': ['react', 'Component'],
      'Fragment': ['react', 'Fragment'],
      'ReactDOM': 'react-dom',
      'PropTypes': 'prop-types',
      'styled': ['styled-components', 'default'],
      'Colors': [path.join(__dirname, 'src/scripts/components/styles/colors'), 'default'],
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__dirname, 'src', 'manifest.json'),
          to: path.join(__dirname, 'dist'),
        },
        {
          from: path.join(__dirname, 'src', 'images'),
          to: path.join(__dirname, 'dist', 'images'),
        },
        {
          from: path.join(__dirname, 'src', 'contracts'),
          to: path.join(__dirname, 'dist', ''),
        },
      ]
    ),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
  ]
};