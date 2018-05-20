import sinon from 'sinon';
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

    it('without ', async () => {
        const dreihouse = new Dreihouse(CONFIG_FILENAME, [], new NoopLogger());
        const results = await dreihouse.execute(ROOT_URL, 9222);
        if (!results) {
            throw new Error('No results');
        }

        expect(results).to.have.lengthOf(1);
        const result = results.shift();
        expect(result).to.not.equal(null);
        if (!result) {
            throw new Error('No result');
        }

        const reportCategories = result.reportCategories;
        expect(reportCategories).to.have.lengthOf(5);

        const category = reportCategories.shift();

        expect(category).to.have.property('name');
        expect(category).to.have.property('description');
        expect(category).to.have.property('audits');
        expect(category).to.have.property('id');
        expect(category).to.have.property('score');
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

    it('json-dashboard', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger());
            await dreihouse.execute(ROOT_URL);
        } catch (e) {
            assert.fail(null, null, e);
        }
    });

});
