"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dreihouse_1 = __importDefault(require("../src/Dreihouse"));
const simpleServer_1 = require("./data/simpleServer");
const NoopLogger_1 = __importDefault(require("../src/Logger/NoopLogger"));
const CONFIG_FILENAME = './test/data/config.js';
const { expect, assert } = require('chai');
const ROOT_URL = 'http://localhost:8000';
describe('Dashboard Json Result Reporter', () => {
    before(() => {
        return simpleServer_1.start();
    });
    after(() => {
        return simpleServer_1.stop();
    });
    it('json-dashboard', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger_1.default());
            const result = yield dreihouse.execute(ROOT_URL);
            if (result && result[0].reporters) {
                const reporters = result[0].reporters;
                if (reporters && reporters.length > 0) {
                    const reporter = reporters[0];
                    expect(reporter.key).to.equal('DashboardJsonResultReporter');
                    const jsonResult = require(reporter.value);
                    expect(jsonResult).to.have.property('url');
                    expect(jsonResult).to.have.property('categories');
                    expect(jsonResult).to.have.property('tag');
                    expect(jsonResult).to.have.property('version');
                    expect(jsonResult).to.have.property('budget');
                    const categories = jsonResult.categories;
                    expect(categories[0]).to.have.property('name');
                    expect(categories[0]).to.have.property('id');
                    expect(categories[0]).to.have.property('score');
                }
            }
        }
        catch (e) {
            assert.fail(null, null, e);
        }
    }));
});
//# sourceMappingURL=DashboardJsonResultReporter.test.js.map