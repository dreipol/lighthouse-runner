import sinon from 'sinon';
import Dreihouse from '../src/Dreihouse';
import {start, stop} from './data/simpleServer';
import NoopLogger from '../src/Logger/NoopLogger';

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

    describe('preAuditScripts', () => {

        it('no scripts', async () => {
            const config: any = {...DEFAULT_CONFIG};
            config.preAuditScripts = [];
            const dreihouse = new Dreihouse(CONFIG_FILENAME, [], new NoopLogger(), true);
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

            const dreihouse = new Dreihouse(CONFIG_FILENAME, [], new NoopLogger(), true);
            await dreihouse.loadConfig(config);
            await dreihouse.execute(ROOT_URL);

            expect(execute.called).to.be.true;
        });
    });

    describe('basic', () => {

        it('create report', async () => {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['cli'], new NoopLogger(), true);
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

        it('fail on missing config file', async () => {
            try {
                const dreihouse = new Dreihouse('./test/data/config2.ts', [], new NoopLogger(), true);
                await dreihouse.execute(ROOT_URL);
                assert.fail(null, null, 'Should fail when missing config file');
            } catch (e) {
                return;
            }
        });
    });
});
