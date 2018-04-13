'use strict';
const { start, stop } = require('./data/simpleServer');
const { execute } = require('../dist/index');
const { getScoreString } = require('../dist/budget');

const { resolve } = require('path');
const rimraf = require('rimraf');
const { expect } = require('chai');

describe('Utils', function () {
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
        }, {});

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
