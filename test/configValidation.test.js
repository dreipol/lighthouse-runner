const { validate } = require('../dist/validation/configValidation');

const { expect } = require('chai');

const DEFAULT_CONFIG = {
    url: 'http://localhost:8000',
    paths: [
        '/',
    ],
    folder: "./reports",
    tag: 'default',
    chromeFlags: ['--headless'],
    disableEmulation: true,
    disableThrottling: true,
    saveReport: true,
    budget: {
        dreipol: 100,
        seo: 90,
        performance: 90,
        pwa: false,
        accessibility: 70,
        'best-practices': 70,
    },
    report: {}
};

describe('Validate Config', function () {
    it('Normalize config', () => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
            disableEmulation: 'true'
        });

        return validate(config)
            .then(results => {
                expect(results.disableEmulation).to.equal(true);
            });
    });

    it('Fail on incomplete config', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
        });

        delete config.url;

        validate(config)
            .then(() => {
                done(new Error('Invalid config should fail'));
            })
            .catch(e => {
                done();
            });
    });

    it('`folder` is not required when `saveReport` is false', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
            saveReport: false,
            folder: null,
        });

        validate(config)
            .then(() => {
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('`folder` is required when `saveReport` is true', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
            saveReport: true
        });

        delete config.folder;

        validate(config)
            .then(() => {
                done(new Error('Invalid config should fail'));
            })
            .catch(e => {
                done();
            });
    });
});
