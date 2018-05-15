const desktopBaseConfig = require('@dreipol/lighthouse-config/config/local/desktop');
let config = require('./lh.base')(desktopBaseConfig);

config.url = 'http://localhost:8000';

module.exports = config;
