import Dreihouse from '../src/Dreihouse';
import {start, stop} from './data/simpleServer';
import NoopLogger from '../src/Logger/NoopLogger';

const CONFIG_FILENAME = './test/data/config.js';

const {expect, assert} = require('chai');
const ROOT_URL = 'http://localhost:8000';

describe('Dashboard Json Result Reporter', () => {
    before(() => {
        return start();
    });
    
    after(() => {
        return stop();
    });
    
    it('json-dashboard', async () => {
        try {
            const dreihouse = new Dreihouse(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger());
            const result = await dreihouse.execute(ROOT_URL);
            if (result && result[0].reporters) {
                const reporters = result[0].reporters;
                if (reporters && reporters.length > 0) {
                    const reporter = reporters[0];
                    
                    expect(reporter.key).to.equal('DashboardJsonResultReporter');
                    const jsonResult = require(reporter.value);
                    
                    expect(jsonResult).to.have.property('url');
                    expect(jsonResult).to.have.property('categories');
                    expect(jsonResult).to.have.property('tag');
                    expect(jsonResult).to.have.property('version');
                    expect(jsonResult).to.have.property('budget');
                    
                    const categories = jsonResult.categories;
                    
                    expect(categories[0]).to.have.property('name');
                    expect(categories[0]).to.have.property('id');
                    expect(categories[0]).to.have.property('score');
                }
            }
        } catch (e) {
            assert.fail(null, null, e);
        }
    });
    
});
