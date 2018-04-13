'use strict';
const { start, stop } = require('./data/simpleServer');
const { execute } = require('../dist/index');

const { existsSync } = require('fs');
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
                const result = results.shift();
                const reportCategories = result.reportCategories;
                expect(reportCategories).to.have.lengthOf(5);

                const category = reportCategories.shift();


                expect(category).to.have.property('name');
                expect(category).to.have.property('description');
                expect(category).to.have.property('audits');
                expect(category).to.have.property('id');
                expect(category).to.have.property('score');
            });
    });

    it('Create persister files', () => {
        return execute('./test/data/config.js', null)
            .then(results => {
                expect(results).to.have.lengthOf(1);
                const result = results.shift();
                const { files } = result;

                expect(result).to.have.property('files');
                expect(files).to.have.lengthOf(4);

                for (let i = 0; i < files.length; i++) {
                    expect(existsSync(files[i])).to.be.true;
                }
            });
    });

});
