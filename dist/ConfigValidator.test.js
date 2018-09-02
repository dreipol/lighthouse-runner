"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const Config_1 = require("../src/Config");
const chai_1 = require("chai");
const DEFAULT_CONFIG = require('./data/config.js');
describe('Validate Config', () => {
    it('Normalize config', () => {
        const config = Object.assign({}, DEFAULT_CONFIG, { disableEmulation: 'true' });
        const results = Config_1.ConfigValidator.validate(config);
        chai_1.expect(results.disableEmulation).to.equal(true);
    });
    it('Fail on incomplete config', (done) => {
        const config = Object.assign({}, DEFAULT_CONFIG);
        delete config.paths;
        try {
            Config_1.ConfigValidator.validate(config);
            done(new Error('Invalid config should fail'));
        }
        catch (e) {
            done();
        }
    });
    it('`folder` can be null', (done) => {
        const config = Object.assign({}, DEFAULT_CONFIG, {
            folder: null,
        });
        try {
            Config_1.ConfigValidator.validate(config);
            done();
        }
        catch (e) {
            done(e);
        }
    });
    it('`folder` can be null', (done) => {
        const config = Object.assign({}, DEFAULT_CONFIG);
        delete config.folder;
        try {
            Config_1.ConfigValidator.validate(config);
            done(new Error('Folder should be set in config'));
        }
        catch (e) {
            done();
        }
    });
    it('Use objects directly in config for reporters', (done) => {
        const config = Object.assign({}, DEFAULT_CONFIG, {
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
        });
        delete config.folder;
        try {
            Config_1.ConfigValidator.validate(config);
            done(new Error('Invalid config should fail'));
        }
        catch (e) {
            done();
        }
    });
});
//# sourceMappingURL=ConfigValidator.test.js.map