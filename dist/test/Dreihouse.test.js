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
const sinon_1 = __importDefault(require("sinon"));
const Dreihouse_1 = __importDefault(require("../src/Dreihouse"));
const simpleServer_1 = require("./data/simpleServer");
const NoopLogger_1 = __importDefault(require("../src/Logger/NoopLogger"));
const CONF_1 = require("./CONF");
const DEFAULT_CONFIG = require(CONF_1.TEST_CONFIG_FILE);
const { expect, assert } = require('chai');
const ROOT_URL = 'http://localhost:8000';
const NOOP_REPORTER = {
    key: 'noop',
    setup: () => __awaiter(this, void 0, void 0, function* () {
        return;
    }),
    handle: () => __awaiter(this, void 0, void 0, function* () {
        return;
    }),
};
describe('Dreihouse', () => {
    before(() => {
        return simpleServer_1.start();
    });
    after(() => {
        return simpleServer_1.stop();
    });
    describe('preAuditScripts', () => {
        it('no scripts', () => __awaiter(this, void 0, void 0, function* () {
            const dreihouse = new Dreihouse_1.default(CONF_1.CONFIG_FILENAME, [], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
        }));
        it('custom script', () => __awaiter(this, void 0, void 0, function* () {
            const execute = sinon_1.default.spy();
            const config = Object.assign({}, DEFAULT_CONFIG);
            config.preAuditScripts = [
                {
                    execute,
                },
            ];
            const dreihouse = new Dreihouse_1.default(config, [], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
            expect(execute.called).to.be.true;
        }));
    });
    describe('basic', () => {
        it('create lighthouse', () => __awaiter(this, void 0, void 0, function* () {
            const dreihouse = new Dreihouse_1.default(CONF_1.CONFIG_FILENAME, [NOOP_REPORTER], new NoopLogger_1.default());
            const results = yield dreihouse.execute(ROOT_URL);
            if (!results) {
                throw new Error('No results');
            }
            expect(results).to.have.lengthOf(1);
            const result = results.shift();
            expect(result).to.not.equal(null);
            if (!result) {
                throw new Error('No result');
            }
            const reportCategories = result.categoryGroups;
            expect(reportCategories).to.have.lengthOf(5);
            const category = reportCategories.shift();
            expect(category).to.have.property('score');
            expect(category).to.have.property('id');
            expect(category).to.have.property('title');
            expect(category).to.have.property('auditRefs');
        }));
        it('fail on missing config file', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const dreihouse = new Dreihouse_1.default('./test/data/config2.ts', [], new NoopLogger_1.default());
                yield dreihouse.execute(ROOT_URL);
                assert.fail(null, null, 'Should fail when missing config file');
            }
            catch (e) {
                return;
            }
        }));
        it('resolve relative folder path from config', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const dreihouse = new Dreihouse_1.default('./test/data/config.ts', [], new NoopLogger_1.default());
                console.log(dreihouse.getConfig());
            }
            catch (e) {
                return;
            }
        }));
    });
});
//# sourceMappingURL=Dreihouse.test.js.map