'use strict';

import {start, stop} from './data/simpleServer';
import {report} from "../src/CLI/lib";
const {expect} = require('chai');

describe('CLI', function () {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    it('Create report', async () => {
        const data = await report('./test/data/config.js', true, null);
        expect(data).to.be.a('array');
    });

    it('Throw error if config does not exist', (done) => {
        report('./test/asdf/config.js', true, null)
            .then(() => {
                done(new Error('Config file should not be existing'));
            })
            .catch(() => {
                done();
            });
    });
});
