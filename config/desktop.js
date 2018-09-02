module.exports = {
    paths: [
        '/',
    ],
    folder: './dreihouse-reports',
    tag: 'desktop',
    chromeFlags: ['--window-size=1280,1024', '--headless'],
    initialPageload: false,
    disableEmulation: true,
    disableThrottling: true,
    budget: {
        dreipol: 0.9,
        seo: 0.9,
        performance: 0.9,
        pwa: 0.9,
        accessibility: 0.9,
        'best-practices': 0.9,
    },
};
