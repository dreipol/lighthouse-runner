"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const ConfigValidator_1 = __importDefault(require("../src/Validator/ConfigValidator"));
const chai_1 = require("chai");
const DEFAULT_CONFIG = require('./data/config.js');
describe('ConfigValidator', () => {
    it('Normalize config', () => {
        const config = Object.assign({}, DEFAULT_CONFIG, { disableEmulation: 'true' });
        const results = ConfigValidator_1.default.validate(config);
        chai_1.expect(results.disableEmulation).to.equal(true);
    });
    it('Fail on incomplete config', (done) => {
        const config = Object.assign({}, DEFAULT_CONFIG);
        delete config.paths;
        try {
            ConfigValidator_1.default.validate(config);
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
            ConfigValidator_1.default.validate(config);
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
            ConfigValidator_1.default.validate(config);
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
            ConfigValidator_1.default.validate(config);
            done(new Error('Invalid config should fail'));
        }
        catch (e) {
            done();
        }
    });
});
//# sourceMappingURL=ConfigValidator.test.js.map