import sinon from 'sinon';
import Dreihouse from '../src/Dreihouse';
import {start, stop} from './data/simpleServer';

const DEFAULT_CONFIG = require('./data/config');

const CONFIG_FILENAME = './test/data/config.js';

const {expect, assert} = require('chai');
const ROOT_URL = 'http://localhost:8000';

describe('Dreihouse', () => {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    describe('Reporters', () => {
        it('without ', async () => {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, []);
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
            }]);
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
                }]);
                await dreihouse.execute(null);
                assert.fail(null, null, 'Invalid reporter should throw error');
            } catch (e) {
                return;
            }
        });

        it('invalid reporter name', async () => {
            try {
                const dreihouse = new Dreihouse(CONFIG_FILENAME, ['foo']);
                await dreihouse.execute(ROOT_URL);
                assert.fail(null, null, 'Invalid reporter should thow error');
            } catch (e) {
                return;
            }
        });
    });

    describe('preAuditScripts', () => {

        it('no scripts', async () => {
            const config: any = {...DEFAULT_CONFIG};
            config.preAuditScripts = [];
            const dreihouse = new Dreihouse(CONFIG_FILENAME, []);
            await dreihouse.loadConfig(config);
            await dreihouse.execute(ROOT_URL);
        });

        it('custom script', async () => {
            const execute = sinon.spy();
            const config: any = {...DEFAULT_CONFIG};
            config.preAuditScripts = [
                {
                    execute,
                },
            ];

            const dreihouse = new Dreihouse(CONFIG_FILENAME, []);
            await dreihouse.loadConfig(config);
            await dreihouse.execute(ROOT_URL);

            expect(execute.called).to.be.true;
        });
    });

    describe('basic', () => {

        it('Create report', async () => {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['cli']);
            const results = await dreihouse.execute(ROOT_URL);
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

        it('Fail on missing file report', async () => {
            try {
                const dreihouse = new Dreihouse('./test/data/config2.ts', []);
                await dreihouse.execute(ROOT_URL);
                assert.fail(null, null, 'Should fail when missing config file');
            } catch (e) {
                return;
            }
        });
    });
});
