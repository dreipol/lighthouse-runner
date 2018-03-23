const { start, stop } = require('./simpleServer');
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

    it('Normalize config', () => {
        return execute('./test/data/normalize_config.js', null, function () { })
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

    it('Error on faulty config', (done) => {
        execute('./test/data/corrupt_config.js', null, function () { })
            .then(() => {
                done(new Error('Validation should fail'))
            })
            .catch(e => {
                done();
            });
    });

    it('Error if file does not exist', (done) => {
        execute('./test/data/asdf_config.js', null, function () { })
            .then(() => {
                done(new Error('Validation should fail'))
            })
            .catch(e => {
                done();
            });
    });

    it('Error if report folder does not exist', (done) => {
        execute('./test/data/wrong_report_folder_config.js', null, function () { })
            .then(() => {
                done(new Error('Validation should fail'))
            })
            .catch(e => {
                done();
            });
    });
});