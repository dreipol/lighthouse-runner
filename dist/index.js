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
const path_1 = require("path");
const fs_1 = require("fs");
const helper_1 = require("./utils/helper");
const ConfigValidator_1 = __importDefault(require("./validation/ConfigValidator"));
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = __importDefault(require("./ReportRunner/ReportRunner"));
const ReporterModuleLoader_1 = __importDefault(require("./ReporterModuleLoader/ReporterModuleLoader"));
function executeReport(meta, config, port) {
    const { url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling } = config;
    const { printer } = meta;
    const opts = {
        chromeFlags,
    };
    opts.disableDeviceEmulation = disableEmulation;
    opts.disableNetworkThrottling = disableThrottling;
    opts.disableCpuThrottling = disableThrottling;
    printer.print(`Run Report: ${url}`);
    printer.print(`Config:`, `[${chromeFlags.join(';')}]`, helper_1.coloredFlag('disableEmulation', disableEmulation), helper_1.coloredFlag('disableThrottling', disableThrottling), helper_1.coloredFlag('saveReport', saveReport));
    let reportPaths = paths;
    if (!Array.isArray(paths)) {
        reportPaths = [paths];
    }
    const reporters = ReporterModuleLoader_1.default.load(meta.reportFolder, config, printer, config.persisters.modules);
    const runner = new ReportRunner_1.default(config, port, opts, meta, reporters);
    return runner.createReports(reportPaths);
}
exports.executeReport = executeReport;
function execute(configFile, port, printer = new NoopLogger_1.default()) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!configFile) {
            return Promise.reject(new Error('No config file provided'));
        }
        const configFilePath = path_1.resolve(process.cwd(), configFile);
        printer.print(`Config file: ${configFile}`);
        if (!fs_1.existsSync(configFile)) {
            return Promise.reject(new Error(`File not found at ${configFile}`));
        }
        let config = require(configFilePath);
        printer.print(`Using persisters: ${config.persisters.modules}`);
        const meta = helper_1.composeMetaObject(configFile, config, printer);
        const validatedConfig = yield ConfigValidator_1.default.validate(config);
        return yield executeReport(meta, validatedConfig, port);
    });
}
exports.execute = execute;
