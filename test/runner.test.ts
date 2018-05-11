'use strict';
import sinon from 'sinon';

const {expect, assert} = require('chai');

import Dreihouse from '../src/Dreihouse';
import {start, stop} from './data/simpleServer';

describe('Run report', () => {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    it('Create report', async () => {
        const dreihouse = new Dreihouse('./test/data/config.js', ['cli']);
        const results = await dreihouse.execute(null);
        if (!results) {
            throw new Error('No results');
        }

        expect(results).to.have.lengthOf(1);
        const result = results.shift();
        expect(result).to.not.equal(null);
        if (!result) {
            throw new Error('No result');
        }

        const reportCategories = result.reportCategories;
        expect(reportCategories).to.have.lengthOf(5);

        const category = reportCategories.shift();

        expect(category).to.have.property('name');
        expect(category).to.have.property('description');
        expect(category).to.have.property('audits');
        expect(category).to.have.property('id');
        expect(category).to.have.property('score');
    });

    it('Create report without reporters', async () => {
        const dreihouse = new Dreihouse('./test/data/config.js', []);
        const results = await dreihouse.execute(null);
        if (!results) {
            throw new Error('No results');
        }

        expect(results).to.have.lengthOf(1);
        const result = results.shift();
        expect(result).to.not.equal(null);
        if (!result) {
            throw new Error('No result');
        }

        const reportCategories = result.reportCategories;
        expect(reportCategories).to.have.lengthOf(5);

        const category = reportCategories.shift();

        expect(category).to.have.property('name');
        expect(category).to.have.property('description');
        expect(category).to.have.property('audits');
        expect(category).to.have.property('id');
        expect(category).to.have.property('score');
    });

    it('Do not create report with invalid reporters', async () => {
        try {
            const dreihouse = new Dreihouse('./test/data/config.js', ['foo']);
            await dreihouse.execute(null);
            assert.fail(null, null, 'Invalid reporter should thow error');
        } catch (e) {
        }
    });

    it('Create with valid reporter objects', async () => {
        const setup = sinon.spy();
        const handle = sinon.spy();
        const dreihouse = new Dreihouse('./test/data/config.js', [{
            key: 'spy',
            setup,
            handle,
        }]);
        await dreihouse.execute(null);

        expect(setup.called).to.be.true;
        expect(handle.called).to.be.true;

    });

    it('Fail on missing file report', async (done) => {
        try {
            const dreihouse = new Dreihouse('./test/data/config2.js', []);
            await dreihouse.execute(null);
            done(new Error('Should fail when missing config file'));
        } catch (e) {
            done();
        }
    });
});
