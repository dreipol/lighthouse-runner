'use strict';

/**
 * Adjustments needed for DevTools network throttling to simulate
 * more realistic network conditions.
 * See: crbug.com/721112
 */
const DEVTOOLS_RTT_ADJUSTMENT_FACTOR = 3.75;
const DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR = 0.9;

const throttling = {
    mobile3G: {
        rttMs: 150,
        throughputKbps: 1.6 * 1024,
        requestLatencyMs: 150 * DEVTOOLS_RTT_ADJUSTMENT_FACTOR,
        downloadThroughputKbps: 1.6 * 1024 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        uploadThroughputKbps: 750 * DEVTOOLS_THROUGHPUT_ADJUSTMENT_FACTOR,
        cpuSlowdownMultiplier: 4,
    },
};

const defaultSettings = {
    maxWaitForLoad: 45 * 1000,
    throttlingMethod: 'devtools',
    throttling: throttling.mobile3G,
};

const defaultPassConfig = {
    passName: 'defaultPass',
    recordTrace: false,
    useThrottling: false,
    pauseAfterLoadMs: 0,
    networkQuietThresholdMs: 0,
    cpuQuietThresholdMs: 0,
    blockedUrlPatterns: [],
    blankPage: 'about:blank',
    blankDuration: 300,
    gatherers: [],
};

module.exports = {
    throttling,
    defaultSettings,
    defaultPassConfig,
};
