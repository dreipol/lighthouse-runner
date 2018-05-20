import sinon from 'sinon';
import Dreihouse from '../src/Dreihouse';
import {start, stop} from './data/simpleServer';

const CONFIG_FILENAME = './test/data/config.js';

const {expect} = require('chai');
const ROOT_URL = 'http://localhost:8000';

describe('Logger', () => {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    it('custom script', async () => {
        const print = sinon.spy();
        const error = sinon.spy();
        const Logger = {
            print,
            error,
        };

        const dreihouse = new Dreihouse(CONFIG_FILENAME, [], Logger);
        await dreihouse.execute(ROOT_URL);

        expect(print.called).to.be.true;
        expect(error.called).to.be.false;
    });

});
