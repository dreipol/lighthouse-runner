import sinon from 'sinon';
import {get} from 'lodash';
import Dreihouse from '../src/Dreihouse';
import {start, stop} from './data/simpleServer';
import NoopLogger from '../src/Logger/NoopLogger';

const CONFIG_FILENAME = './test/data/config.js';

const {expect, assert} = require('chai');
const ROOT_URL = 'http://localhost:8000';

describe('Reporters', () => {
    before(() => {
        return start();
    });
    
    after(() => {
        return stop();
    });
    
    it('valid reporter object', async () => {
        const setup = sinon.spy();
        const handle = sinon.spy();
        
        const dreihouse = new Dreihouse(CONFIG_FILENAME, [{
            key: 'spy',
            setup,
            handle,
        }], new NoopLogger());
        await dreihouse.execute(ROOT_URL);
        
        expect(setup.called).to.be.true;
        expect(handle.called).to.be.true;
    });
    
    it('invalid reporter objects', async () => {
        try {
            const setup = sinon.spy();
            // @ts-ignore
            const dreihouse = new Dreihouse(CONFIG_FILENAME, [{
                key: 'spy',
                setup,
            }], new NoopLogger(), true);
            await dreihouse.execute(null);
            assert.fail(null, null, 'Invalid reporter should throw error');
        } catch (e) {
            return;
        }
    });
    
    it('invalid reporter name', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['foo'], new NoopLogger());
            await dreihouse.execute(ROOT_URL);
            assert.fail(null, null, 'Invalid reporter should thow error');
        } catch (e) {
            return;
        }
    });
    
    it('cli', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['cli'], new NoopLogger());
            await dreihouse.execute(ROOT_URL);
        } catch (e) {
            assert.fail(null, null, e);
        }
    });
    
    it('html', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['html'], new NoopLogger());
            await dreihouse.execute(ROOT_URL);
        } catch (e) {
            assert.fail(null, null, e);
        }
    });
    
    it('json', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['json'], new NoopLogger());
            await dreihouse.execute(ROOT_URL);
        } catch (e) {
            assert.fail(null, null, e);
        }
    });
    
    it.skip('json content', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger());
            const res = await dreihouse.execute(ROOT_URL);
            
            if (res) {
                const filename = get(res[0], 'reporters[0].value');
                //@todo
                console.log(filename);
            }
        } catch (e) {
            assert.fail(null, null, e);
        }
    });
    
    it('json-dashboard', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger());
            await dreihouse.execute(ROOT_URL);
        } catch (e) {
            assert.fail(null, null, e);
        }
    });
    
});
