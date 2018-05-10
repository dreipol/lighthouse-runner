import 'mocha';
import ConfigValidator from "../src/Validator/ConfigValidator";
import {expect} from 'chai';

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
    reporters: {
        modules: []
    },
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
        const config = Object.assign({}, DEFAULT_CONFIG, {
            disableEmulation: 'true'
        });

        const results = ConfigValidator.validate(config);
        expect(results.disableEmulation).to.equal(true);
    });

    it('Fail on incomplete config', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {});

        delete config.url;

        try {
            ConfigValidator.validate(config)
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });

    it('`folder` is not required when `saveReport` is false', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
            saveReport: false,
            folder: null,
        });

        try {
            ConfigValidator.validate(config);
            done();
        } catch (e) {
            done(e);
        }
    });

    it('`folder` is required when `saveReport` is true', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
            saveReport: true
        });

        delete config.folder;

        try {
            ConfigValidator.validate(config)
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });

    it('Use objects directly in config for reporters', (done) => {
        let config = Object.assign({}, DEFAULT_CONFIG, {
            persisters: {
                modules: [
                    {
                        setup() {
                        },
                        handle() {
                        }
                    }
                ]
            }
        });

        delete config.folder;

        try {
            ConfigValidator.validate(config)
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });
});
