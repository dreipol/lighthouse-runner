"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonResultReporter_1 = __importDefault(require("../ResultReporter/JsonResultReporter"));
const DashboardJsonResultReporter_1 = __importDefault(require("../ResultReporter/DashboardJsonResultReporter"));
const HTMLResultPersister_1 = __importDefault(require("../ResultReporter/HTMLResultPersister"));
const CLIReporter_1 = __importDefault(require("../ResultReporter/CLIReporter"));
const MAPPED_REPORTERS = {
    'json': JsonResultReporter_1.default,
    'json-dashboard': DashboardJsonResultReporter_1.default,
    'html': HTMLResultPersister_1.default,
    'cli': CLIReporter_1.default,
};
class ReporterModuleLoader {
    static load(reportFolder, config, logger, loaders) {
        const handlers = [];
        loaders.forEach((module) => {
            if (typeof module === 'string') {
                const Reporter = ReporterModuleLoader.getMappedReporter(module);
                if (Reporter) {
                    handlers.push(new Reporter(reportFolder, config, logger));
                }
            }
            if (typeof module === 'object') {
                if (!module.setup || !module.handle) {
                    throw new Error('Object does not implement the ResultReporterInterface');
                }
                handlers.push(module);
            }
        });
        return handlers;
    }
    static getMappedReporter(key) {
        if (!MAPPED_REPORTERS[key]) {
            throw new Error(`No reporter for ${key} found`);
        }
        return MAPPED_REPORTERS[key];
    }
}
exports.default = ReporterModuleLoader;
//# sourceMappingURL=ReporterModuleLoader.js.map