module.exports = {
    paths: [
        '/',
    ],
    folder: './dreihouse-reports',
    tag: 'mobile',
    chromeFlags: ['--window-size=320,480', '--headless'],
    initialPageload: false,
    disableEmulation: false,
    disableThrottling: false,
    budget: {
        dreipol: 0.9,
        seo: 0.9,
        performance: 0.9,
        pwa: 0.9,
        accessibility: 0.9,
        'best-practices': 0.9,
    },
};
