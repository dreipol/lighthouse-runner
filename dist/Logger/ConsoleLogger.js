"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fancy_log_1 = require("fancy-log");
class ConsoleLogger {
    print(...args) {
        fancy_log_1.info(...args);
    }
    error(...args) {
        fancy_log_1.error(...args);
    }
}
exports.default = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map