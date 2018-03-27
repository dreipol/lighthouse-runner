"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const helper_1 = require("./helper");
const configValidation_1 = require("./validation/configValidation");
const writeReport_1 = require("./writeReport");
const fs_1 = require("fs");
const NoopPrinter_1 = __importDefault(require("./Printer/NoopPrinter"));
const ReportRunner_1 = require("./ReportRunner");
let printer;
function executeReport(configPath, config, port) {
    const { url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling, folder } = config;
    let reportFolder = null;
    if (folder) {
        reportFolder = path_1.resolve(configPath, folder);
    }
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
    return writeReport_1.setupFolder(saveReport, reportFolder)
        .then(() => {
        return ReportRunner_1.runReports(printer, config, opts, port, reportPaths);
    })
        .then((results) => {
        if (saveReport) {
            printer.print(`Save report to: ${folder}`);
            printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }
        return results;
    });
}
exports.executeReport = executeReport;
function execute(configFile, port, logger) {
    if (!configFile) {
        throw new Error('No configfile');
    }
    if (logger) {
        printer = logger;
    }
    else {
        printer = new NoopPrinter_1.default();
    }
    const configFilePath = path_1.resolve(process.cwd(), configFile);
    printer.print(`Config file: ${configFile}`);
    if (!fs_1.existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }
    const config = require(configFilePath);
    return configValidation_1.validate(config)
        .then((validatedConfig) => {
        return executeReport(path_1.dirname(configFilePath), validatedConfig, port);
    });
}
exports.execute = execute;
