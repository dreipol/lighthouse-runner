import 'mocha';
import ConfigValidator from '../src/Validator/ConfigValidator';
import {expect} from 'chai';

const DEFAULT_CONFIG = {
    url: 'http://localhost:8000',
    paths: [
        '/',
    ],
    folder: './reports',
    tag: 'default',
    chromeFlags: ['--headless'],
    disableEmulation: true,
    disableThrottling: true,
    saveReport: true,
    preAuditScripts: [],
    budget: {
        dreipol: 100,
        seo: 90,
        performance: 90,
        pwa: false,
        accessibility: 70,
        'best-practices': 70,
    },
    report: {},
};

describe('Validate Config', () => {
    it('Normalize config', () => {
        const config = {...DEFAULT_CONFIG, ...{disableEmulation: 'true'}};
        // @ts-ignore
        const results = ConfigValidator.validate(config);
        expect(results.disableEmulation).to.equal(true);
    });

    it('Fail on incomplete config', (done) => {
        const config = {...DEFAULT_CONFIG};
        delete config.url;
        try {
            ConfigValidator.validate(config);
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });

    it('`folder` is not required when `saveReport` is false', (done) => {
        const config = {
            ...DEFAULT_CONFIG, ...{
                saveReport: false,
                folder: null,
            },
        };

        try {
            // @ts-ignore
            ConfigValidator.validate(config);
            done();
        } catch (e) {
            done(e);
        }
    });

    it('`folder` is required when `saveReport` is true', (done) => {
        const config = {
            ...DEFAULT_CONFIG, ...{
                saveReport: true,
            },
        };

        delete config.folder;

        try {
            ConfigValidator.validate(config);
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });

    it('Use objects directly in config for reporters', (done) => {
        const config = {
            ...DEFAULT_CONFIG, ...{
                persisters: {
                    modules: [
                        {
                            setup() {
                                return;
                            },
                            handle() {
                                return;
                            },
                        },
                    ],
                },
            },
        };

        delete config.folder;

        try {
            ConfigValidator.validate(config);
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });
});
