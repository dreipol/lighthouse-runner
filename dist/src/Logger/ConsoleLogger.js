"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fancy_log_1 = require("fancy-log");
const chalk_1 = __importDefault(require("chalk"));
exports.ERROR_LEVEL = 1;
exports.INFO_LEVEL = 2;
exports.DEBUG_LEVEL = 3;
class ConsoleLogger {
    constructor(level = 1) {
        this.level = level;
        this.debug(`Verbosity: ${level}`);
    }
    debug(...args) {
        if (this.level >= exports.DEBUG_LEVEL) {
            fancy_log_1.info(chalk_1.default.green('Debug'), ...args);
        }
    }
    error(...args) {
        if (this.level >= exports.ERROR_LEVEL) {
            fancy_log_1.error(chalk_1.default.red('Error'), ...args);
        }
    }
    info(...args) {
        if (this.level >= exports.INFO_LEVEL) {
            fancy_log_1.info(chalk_1.default.blue('Info'), ...args);
        }
    }
    setLevel(level) {
        this.level = level;
        this.debug(`Verbosity: ${level}`);
    }
    getLevel() {
        return this.level;
    }
}
exports.default = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map