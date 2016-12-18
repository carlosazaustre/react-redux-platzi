const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json'],
  },
  entry: './src/client.jsx',
  output: {
    filename: 'app.js',
    path: './build/statics',
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://carlosazaustre-react-sfs.now.sh'
      : 'http://localhost:3001',
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'es2017', 'react'],
          plugins: ['transform-es2015-modules-commonjs'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'],
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin('../statics/styles.css'),
  ],
  target: 'web',
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: { except: ['$super', '$', 'exports', 'require'] },
    })
  );
}

module.exports = config;
