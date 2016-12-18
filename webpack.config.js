const server = require('./webpack/webpack.server.config');
const client = require('./webpack/webpack.client.config');

module.exports = [
  server,
  client,
];
