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
const lodash_1 = require("lodash");
const Dreihouse_1 = __importDefault(require("../src/Dreihouse"));
const simpleServer_1 = require("./data/simpleServer");
const NoopLogger_1 = __importDefault(require("../src/Logger/NoopLogger"));
const CONFIG_FILENAME = './test/data/config.js';
const { expect, assert } = require('chai');
const ROOT_URL = 'http://localhost:8000';
describe('Reporters', () => {
    before(() => {
        return simpleServer_1.start();
    });
    after(() => {
        return simpleServer_1.stop();
    });
    it('valid reporter object', () => __awaiter(this, void 0, void 0, function* () {
        const setup = sinon_1.default.spy();
        const handle = sinon_1.default.spy();
        const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, [{
                key: 'spy',
                setup,
                handle,
            }], new NoopLogger_1.default());
        yield dreihouse.execute(ROOT_URL);
        expect(setup.called).to.be.true;
        expect(handle.called).to.be.true;
    }));
    it('invalid reporter objects', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const setup = sinon_1.default.spy();
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, [{
                    key: 'spy',
                    setup,
                }], new NoopLogger_1.default(), true);
            yield dreihouse.execute(null);
            assert.fail(null, null, 'Invalid reporter should throw error');
        }
        catch (e) {
            return;
        }
    }));
    it('invalid reporter name', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['foo'], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
            assert.fail(null, null, 'Invalid reporter should thow error');
        }
        catch (e) {
            return;
        }
    }));
    it('cli', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['cli'], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
        }
        catch (e) {
            assert.fail(null, null, e);
        }
    }));
    it('html', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['html'], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
        }
        catch (e) {
            assert.fail(null, null, e);
        }
    }));
    it('json', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['json'], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
        }
        catch (e) {
            assert.fail(null, null, e);
        }
    }));
    it.skip('json content', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger_1.default());
            const res = yield dreihouse.execute(ROOT_URL);
            if (res) {
                const filename = lodash_1.get(res[0], 'reporters[0].value');
                console.log(filename);
            }
        }
        catch (e) {
            assert.fail(null, null, e);
        }
    }));
    it('json-dashboard', () => __awaiter(this, void 0, void 0, function* () {
        try {
            const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, ['json-dashboard'], new NoopLogger_1.default());
            yield dreihouse.execute(ROOT_URL);
        }
        catch (e) {
            assert.fail(null, null, e);
        }
    }));
});
//# sourceMappingURL=ResultReporter.test.js.map