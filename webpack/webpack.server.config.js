const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  entry: './src/server.jsx',
  output: {
    filename: 'index.js',
    path: './build/server',
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
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('../statics/styles.css'),
  ],
  target: 'node',
};
