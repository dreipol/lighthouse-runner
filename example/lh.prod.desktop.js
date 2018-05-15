let config = require('./lh.base')(require('@dreipol/lighthouse-config/config/production/desktop'));

config.url = 'https://dreipol.ch';

module.exports = config;
