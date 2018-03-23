const { start, stop } = require('./data/simpleServer');
const { execute } = require('../dist/Runner/index');

const { expect } = require('chai');

describe('Run report', function () {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    it('Create report', () => {
        return execute('./test/data/config.js', null, function () { })
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

    it('Fail on missing file report', (done) => {
        execute('./test/data/config2.js', null, function () { })
            .then(results => {
                done(new Error('Should fail when missing config file'));
            })
            .catch(e => {
                done();
            });
    });
});