let mobileConfig = require('./lh.desktop');

// Set viewport size
mobileConfig.chromeFlags = ['--window-size=320,568'];

// Enable throttling
mobileConfig.disableEmulation = false;
mobileConfig.disableThrottling = false;

module.exports = mobileConfig;

