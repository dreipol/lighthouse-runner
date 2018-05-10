"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractResultReporter {
    constructor(reportFolder, config, logger) {
        this.reportFolder = reportFolder;
        this.config = config;
        this.logger = logger;
    }
}
exports.default = AbstractResultReporter;
