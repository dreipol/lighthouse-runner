'use strict';
const { start, stop } = require('./data/simpleServer');
const { execute } = require('../dist/index');

const rimraf = require('rimraf');
const { expect } = require('chai');

describe('Run report', function () {
    before(() => {
        return start();
    });

    beforeEach((done) => {
        rimraf('test/data/reports/*', function () {
            done();
        });
    });

    after(() => {
        return stop();
    });

    it('Create report', () => {
        return execute('./test/data/config.js', null)
            .then(results => {
                expect(results).to.have.lengthOf(1);
                const routeReport = results.shift();
                const category = routeReport.shift();

                expect(category).to.have.property('name');
                expect(category).to.have.property('description');
                expect(category).to.have.property('audits');
                expect(category).to.have.property('id');
                expect(category).to.have.property('score');
            });
    });

    it.skip('Create report', () => {
        return execute('./test/data/config.js', null)
            .then(results => {
                expect(results).to.have.lengthOf(1);
            });
    });

});
