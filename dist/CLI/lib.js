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
const NoopLogger_1 = __importDefault(require("../Logger/NoopLogger"));
const ConsoleLogger_1 = __importDefault(require("../Logger/ConsoleLogger"));
const writeDefaultConfig_1 = __importDefault(require("./writeDefaultConfig"));
const Dreihouse_1 = __importDefault(require("../Dreihouse"));
function report(config, silent, port) {
    return __awaiter(this, void 0, void 0, function* () {
        const printer = silent ? new NoopLogger_1.default() : new ConsoleLogger_1.default();
        const dreihouse = new Dreihouse_1.default(config, printer);
        return yield dreihouse.execute(port);
    });
}
exports.report = report;
function setup(config) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield writeDefaultConfig_1.default(config);
    });
}
exports.setup = setup;
