require('dotenv').config();
const env = process.env.NODE_ENV;
const config = require('./config.json');
process.env.PORT = config[env].server.port;

module.exports = config[env];