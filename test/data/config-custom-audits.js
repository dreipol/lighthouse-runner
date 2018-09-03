module.exports = {
    paths: [
        '/',
    ],
    folder: './reports',
    tag: 'test',
    chromeFlags: ['--headless'],
    initialPageload: false,
    disableEmulation: true,
    disableThrottling: true,
    budget: {
        dreipol: 100,
        seo: 90,
        performance: 90,
        pwa: false,
        accessibility: 70,
        'best-practices': 70,
    },
    //audits: ['test'],
};
