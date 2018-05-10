'use strict';
import Dreihouse from "../src/Dreihouse";
import ConsoleLogger from "../src/Logger/ConsoleLogger";

const {expect} = require('chai');

const {start, stop} = require('./data/simpleServer');

describe('Run report', function () {
    before(() => {
        return start();
    });

    after(() => {
        return stop();
    });

    it('Create report', async () => {
        const dreihouse = new Dreihouse('./test/data/config.js', new ConsoleLogger());
        const results = await dreihouse.execute(null);

        expect(results).to.have.lengthOf(1);
        const result = results.shift();
        expect(result).to.not.equal(null);
        if (!result) {
            throw new Error('No result');
        }

        //@ts-ignore
        const reportCategories = result.reportCategories;
        expect(reportCategories).to.have.lengthOf(5);

        const category = reportCategories.shift();

        expect(category).to.have.property('name');
        expect(category).to.have.property('description');
        expect(category).to.have.property('audits');
        expect(category).to.have.property('id');
        expect(category).to.have.property('score');
    });


    it('Fail on missing file report', async (done) => {
        try {
            const dreihouse = new Dreihouse('./test/data/config2.js');
            await dreihouse.execute(null);
            done(new Error('Should fail when missing config file'));
        } catch (e) {
            done();
        }
    });
});
