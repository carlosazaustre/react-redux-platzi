const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeModules = fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((modules, module) => Object.assign(modules, { [module]: `commonjs ${module}` }), {});

const config = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.json'],
  },
  entry: './src/server.jsx',
  output: {
    filename: 'index.js',
    path: './build/server',
    publicPath: process.env.NODE_ENV === 'production'
      ? 'https://carlosazaustre-react-bff.now.sh'
      : 'http://localhost:3000',
  },

  module: {
    preLoaders: [
      { test: /\.jsx$/, loader: 'eslint', exclude: /node_modules/ },
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
          presets: ['latest-minimal', 'react'],
          env: {
            production: {
              plugins: ['transform-regenerator', 'transform-runtime'],
              presets: ['es2015'],
            },
            development: {
              presets: ['latest-minimal'],
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
  target: 'node',
  externals: nodeModules,
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
