"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fancy_log_1 = require("fancy-log");
class ConsolePrinter {
    print(...args) {
        fancy_log_1.info(...args);
    }
}
exports.default = ConsolePrinter;
