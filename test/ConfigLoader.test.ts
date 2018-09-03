import 'mocha';
import {expect} from 'chai';
import ConfigLoader from "../src/Config/ConfigLoader";
import {BASE_CONFIG_FILE, CONFIG_FILENAME} from "./CONF";

const DEFAULT_CONFIG = require('./data/config.js');

describe('ConfigLoader', () => {
    describe('load by path', () => {
        it('load config file', async () => {
            const config = ConfigLoader.load(CONFIG_FILENAME);
            expect(config).not.to.be.null;
        });
        
        it('load base config', async () => {
            const config = ConfigLoader.load(BASE_CONFIG_FILE);
            expect(config).not.to.be.null;
        });
        
        it('load default config', async () => {
            const config = ConfigLoader.load(null);
            expect(config).not.to.be.null;
        });
        
        it('load config object', async () => {
            const config = ConfigLoader.load(DEFAULT_CONFIG);
            expect(config).not.to.be.null;
        });
    });
    
    describe('extending default config', () => {
        it('add custom audits', async () => {
            const config = ConfigLoader.load(require('./data/config-custom-audits.js'));
            
            expect(config.lighthouse).not.to.be.null;
            expect(config.lighthouse).to.have.property('settings');
            expect(config.lighthouse).to.have.property('audits');
            expect(config.lighthouse.audits).to.have.lengthOf(116);
            
            if (config.lighthouse) {
                console.log(config.lighthouse.audits.length);
            }
        });
    })
});
