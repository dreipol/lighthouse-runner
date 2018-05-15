let mobileConfig = require('./lh.local.desktop');

// set viewport size
mobileConfig.chromeFlags = ['--window-size=320,568'];

// Enable throttling
mobileConfig.disableEmulation = false;
mobileConfig.disableThrottling = false;

module.exports = mobileConfig;
