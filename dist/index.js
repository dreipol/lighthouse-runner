"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const helper_1 = require("./helper");
const configValidation_1 = require("./validation/configValidation");
const fs_1 = require("fs");
const NoopLogger_1 = __importDefault(require("./Logger/NoopLogger"));
const ReportRunner_1 = require("./ReportRunner");
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
    return ReportRunner_1.runReports(meta, config, opts, port, reportPaths);
}
exports.executeReport = executeReport;
function execute(configFile, port, printer = new NoopLogger_1.default()) {
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
    config = helper_1.remapPersisterNames(config);
    const meta = helper_1.composeMetaObject(configFile, config, printer);
    return configValidation_1.validate(config)
        .then((validatedConfig) => {
        return executeReport(meta, validatedConfig, port);
    })
        .catch((e) => {
        console.error(e);
    });
}
exports.execute = execute;
