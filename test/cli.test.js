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
        const data = await report('./test/data/config.js', true);
        expect(data).to.be.a('array');
    });

    it('Throw error if config does not exist', (done) => {
        report('./test/asdf/config.js', true)
            .then(() => {
                done(new Error('Config file should not be existing'));
            })
            .catch(() => {
                done();
            });
    });
});
