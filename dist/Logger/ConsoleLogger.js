"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fancy_log_1 = require("fancy-log");
const chalk_1 = __importDefault(require("chalk"));
const ERROR_LEVEL = 0;
const INFO_LEVEL = 1;
const DEBUG_LEVEL = 2;
class ConsoleLogger {
    constructor(level = 1) {
        this.level = level;
        this.debug(`Verbosity: ${level}`);
    }
    debug(...args) {
        if (this.level >= DEBUG_LEVEL) {
            fancy_log_1.info(chalk_1.default.green('Debug'), ...args);
        }
    }
    error(...args) {
        if (this.level >= ERROR_LEVEL) {
            fancy_log_1.error(chalk_1.default.red('Error'), ...args);
        }
    }
    info(...args) {
        if (this.level >= INFO_LEVEL) {
            fancy_log_1.info(chalk_1.default.blue('Info'), ...args);
        }
    }
    setLevel(level) {
        this.level = level;
        this.debug(`Verbosity: ${level}`);
    }
}
exports.default = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map