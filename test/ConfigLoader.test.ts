import 'mocha';
import ConfigValidator from '../src/Config/ConfigValidator';
import {expect} from 'chai';

const DEFAULT_CONFIG = require('./data/config.js');

describe('Validate Config', () => {
    it('Normalize config', () => {
        const config = {...DEFAULT_CONFIG, ...{disableEmulation: 'true'}};
        // @ts-ignore
        const results = ConfigValidator.validate(config);
        expect(results.disableEmulation).to.equal(true);
    });
    
    it('Fail on incomplete config', (done) => {
        const config = {...DEFAULT_CONFIG};
        delete config.paths;
        try {
            ConfigValidator.validate(config);
            done(new Error('Invalid config should fail'));
        } catch (e) {
            done();
        }
    });
    
    it('`folder` can be null', (done) => {
        const config = {
            ...DEFAULT_CONFIG, ...{
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
    
    it('`folder` can be null', (done) => {
        const config = {
            ...DEFAULT_CONFIG,
        };
        
        delete config.folder;
        
        try {
            // @ts-ignore
            ConfigValidator.validate(config);
            done(new Error('Folder should be set in config'));
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
