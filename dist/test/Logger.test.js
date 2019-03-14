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
const CONFIG_FILENAME = './test/data/config.js';
const { expect } = require('chai');
const ROOT_URL = 'http://localhost:8000';
describe('Logger', () => {
    before(() => {
        return simpleServer_1.start();
    });
    after(() => {
        return simpleServer_1.stop();
    });
    it('custom script', () => __awaiter(this, void 0, void 0, function* () {
        const debug = sinon_1.default.spy();
        const info = sinon_1.default.spy();
        const error = sinon_1.default.spy();
        const setLevel = sinon_1.default.spy();
        const getLevel = sinon_1.default.spy();
        const Logger = {
            info,
            debug,
            error,
            setLevel,
            getLevel,
        };
        const dreihouse = new Dreihouse_1.default(CONFIG_FILENAME, [], Logger);
        yield dreihouse.execute(ROOT_URL);
        expect(debug.called).to.be.true;
        expect(info.called).to.be.true;
        expect(error.called).to.be.false;
    }));
});
//# sourceMappingURL=Logger.test.js.map