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
require("mocha");
const chai_1 = require("chai");
const ConfigLoader_1 = __importDefault(require("../src/Config/ConfigLoader"));
const CONF_1 = require("./CONF");
const DEFAULT_CONFIG = require('./data/config.js');
describe('ConfigLoader', () => {
    describe('load by path', () => {
        it('load config file', () => __awaiter(this, void 0, void 0, function* () {
            const config = ConfigLoader_1.default.load(CONF_1.CONFIG_FILENAME);
            chai_1.expect(config).not.to.be.null;
        }));
        it('load base config', () => __awaiter(this, void 0, void 0, function* () {
            const config = ConfigLoader_1.default.load(CONF_1.BASE_CONFIG_FILE);
            chai_1.expect(config).not.to.be.null;
        }));
        it('load default config', () => __awaiter(this, void 0, void 0, function* () {
            const config = ConfigLoader_1.default.load(null);
            chai_1.expect(config).not.to.be.null;
        }));
        it('load config object', () => __awaiter(this, void 0, void 0, function* () {
            const config = ConfigLoader_1.default.load(DEFAULT_CONFIG);
            chai_1.expect(config).not.to.be.null;
        }));
    });
});
//# sourceMappingURL=ConfigLoader.test.js.map