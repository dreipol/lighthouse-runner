'use strict';

const { getScoreString } = require('../dist/utils/budget');

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

});
