"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const fancy_log_1 = require("fancy-log");
const path_1 = require("path");
const url_1 = require("url");
const lighthouseRunner_1 = __importDefault(require("./lighthouseRunner"));
const writeReport_1 = __importDefault(require("./writeReport"));
const printBudget_1 = __importDefault(require("./printBudget"));
const checkBudget_1 = __importDefault(require("./checkBudget"));
function runReport(host, paths, opts, config, saveReport, budget, folder, port) {
    const url = url_1.resolve(host, paths);
    fancy_log_1.info(chalk_1.default.blue(`Run ${url}`));
    return lighthouseRunner_1.default(host, paths, opts, config, port)
        .then((results) => {
        if (saveReport && folder) {
            writeReport_1.default(folder, url, results);
            fancy_log_1.info(`Report created and saved`);
        }
        const categories = results.reportCategories;
        let allBudgetsReached = true;
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const score = Math.round(category.score);
            const budgetReached = checkBudget_1.default(category.id, score, budget);
            printBudget_1.default(category.id, category.name, score, budget);
            if (budgetReached === false) {
                allBudgetsReached = false;
            }
        }
        if (allBudgetsReached) {
            fancy_log_1.info(chalk_1.default.bgGreen('Congrats! Budged reached!'));
        }
        return;
    });
}
function runReports(url, paths, opts, config, saveReport, budget, folder, port) {
    const urlPath = paths.shift();
    fancy_log_1.info(''.padStart(10, '-'));
    if (!urlPath) {
        return Promise.resolve();
    }
    return runReport(url, urlPath, opts, config, saveReport, budget, folder, port)
        .then(() => {
        if (paths.length > 0) {
            return runReports(url, paths, opts, config, saveReport, budget, folder, port);
        }
        return;
    })
        .catch((e) => console.error(e));
}
function coloredFlag(name, flag) {
    if (flag === true) {
        return chalk_1.default.green(name);
    }
    return chalk_1.default.red(name);
}
function postReport(saveReport, folder) {
    if (saveReport) {
        fancy_log_1.info(`Save report to: ${folder}`);
        fancy_log_1.info('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
    }
}
function executeReport(configPath, config, port) {
    const { url, paths, report, chromeFlags, saveReport, disableEmulation, disableThrottling, budget, folder } = config;
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
    fancy_log_1.info(`Run Report: ${url}`);
    fancy_log_1.info(`Config:`, `[${chromeFlags.join(';')}]`, coloredFlag('disableEmulation', disableEmulation), coloredFlag('disableThrottling', disableThrottling), coloredFlag('saveReport', saveReport));
    if (!Array.isArray(paths)) {
        return runReport(url, paths, opts, report, saveReport, budget, reportFolder, port)
            .then(() => {
            postReport(saveReport, reportFolder);
        });
    }
    return runReports(url, paths, opts, report, saveReport, budget, reportFolder, port)
        .then(() => {
        postReport(saveReport, reportFolder);
    });
}
exports.executeReport = executeReport;
function execute(configFile, port) {
    if (!configFile) {
        throw new Error('No configfile');
    }
    const configFilePath = path_1.resolve(process.cwd(), configFile);
    fancy_log_1.info(`Config file: ${configFile}`);
    executeReport(path_1.dirname(configFilePath), require(configFilePath), port);
}
exports.execute = execute;
