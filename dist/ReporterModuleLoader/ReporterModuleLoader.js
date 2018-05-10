"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JsonResultReporter_1 = __importDefault(require("../ResultReporter/JsonResultReporter"));
const DashboardJsonResultReporter_1 = __importDefault(require("../ResultReporter/DashboardJsonResultReporter"));
const HTMLResultPersister_1 = __importDefault(require("../ResultReporter/HTMLResultPersister"));
const MAPPED_REPORTERS = {
    'json': JsonResultReporter_1.default,
    'json-dashboard': DashboardJsonResultReporter_1.default,
    'html': HTMLResultPersister_1.default,
};
class ReporterModuleLoader {
    static getMappedReporter(key) {
        if (!MAPPED_REPORTERS[key]) {
            console.warn(`No module found for ${key}`);
            return null;
        }
        return MAPPED_REPORTERS[key];
    }
    static load(reportFolder, config, logger, loaders) {
        const handlers = [];
        loaders.forEach((module) => {
            if (typeof module === 'string') {
                const Reporter = ReporterModuleLoader.getMappedReporter(module);
                if (Reporter) {
                    handlers.push(new Reporter(reportFolder, config, logger));
                }
            }
            if (typeof module === 'function') {
                if (!module.setup || !module.handle) {
                    console.warn('Module does not implement the ResultReporterInterface');
                }
                handlers.push(module);
            }
        });
        return handlers;
    }
}
exports.default = ReporterModuleLoader;
