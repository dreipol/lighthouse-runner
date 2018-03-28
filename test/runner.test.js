'use strict';
const { start, stop } = require('./data/simpleServer');
const { execute } = require('../dist/index');
const { getScoreString } = require('../dist/budget');

const { expect } = require('chai');

describe('Run report', function () {
    before(() => {
        return start();
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

    it('Create report with budget', () => {
        const result = getScoreString({
            id: 'PWA',
            name: 'PWA',
            score: 100
        }, {
                PWA: 100
            });

        expect(result).to.be.equal('PWA: 100/100');
    });

    it('Create report with disabled budget', () => {
        const result = getScoreString({
            id: 'PWA',
            name: 'PWA',
            score: 100
        }, {
                PWA: false
            });

        expect(result).to.be.equal('PWA: 100');
    });

    it('Create report with no budget', () => {
        const result = getScoreString({
            id: 'PWA',
            name: 'PWA',
            score: 100
        }, {
            });

        expect(result).to.be.equal('PWA: 100');
    });

    it('Fail on missing file report', (done) => {
        execute('./test/data/config2.js')
            .then(results => {
                done(new Error('Should fail when missing config file'));
            })
            .catch(e => {
                done();
            });
    });
});
