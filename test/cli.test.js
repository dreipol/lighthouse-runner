'use strict';
const { start, stop } = require('./data/simpleServer');
const { report } = require('../dist/CLI/lib.js');

const { expect } = require('chai');

describe('CLI', function () {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    it('Create report', async () => {
        const data = await report('./test/data/config.js', 'json', true, null);
        expect(data).to.be.a('array');
    });
});
