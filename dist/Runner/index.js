"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const path_1 = require("path");
const url_1 = require("url");
const lighthouseRunner_1 = __importDefault(require("./lighthouseRunner"));
const writeReport_1 = __importDefault(require("./writeReport"));
const checkBudget_1 = __importDefault(require("./checkBudget"));
const configValidation_1 = __importDefault(require("./configValidation"));
const fs_1 = require("fs");
let log = console.log;
function runReport(host, paths, opts, config, saveReport, budget, folder, port) {
    const url = url_1.resolve(host, paths);
    log(chalk_1.default.blue(`Run ${url}`));
    return lighthouseRunner_1.default(host, paths, opts, config, port)
        .then((results) => {
        if (saveReport && folder) {
            writeReport_1.default(folder, url, results);
            log(`Report created and saved`);
        }
        const categories = results.reportCategories;
        let allBudgetsReached = true;
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const score = Math.round(category.score);
            const budgetReached = checkBudget_1.default(category.id, score, budget);
            printBudget(category.id, category.name, score, budget);
            if (budgetReached === false) {
                allBudgetsReached = false;
            }
        }
        if (allBudgetsReached) {
            log(chalk_1.default.bgGreen('Congrats! Budged reached!'));
        }
        return categories;
    });
}
function runReports(url, paths, opts, config, saveReport, budget, folder, port, allResults = []) {
    const urlPath = paths.shift();
    log(''.padStart(10, '-'));
    if (!urlPath) {
        return Promise.resolve();
    }
    return runReport(url, urlPath, opts, config, saveReport, budget, folder, port)
        .then((results) => {
        allResults.push(results);
        if (paths.length > 0) {
            return runReports(url, paths, opts, config, saveReport, budget, folder, port, allResults);
        }
        return allResults;
    })
        .catch((e) => console.error(e));
}
function printBudget(categoryId, name, score, budget) {
    const threshhold = budget[categoryId];
    if (threshhold === false || threshhold === undefined || threshhold === null) {
        log(name, score);
        return;
    }
    if (score >= threshhold) {
        log(chalk_1.default.green(`${name}: ${score}/${threshhold}`));
    }
    else {
        log(chalk_1.default.red(`${name}: ${score}/${threshhold}`));
    }
}
function coloredFlag(name, flag) {
    if (flag === true) {
        return chalk_1.default.green(name);
    }
    return chalk_1.default.red(name);
}
function postReport(saveReport, folder) {
    if (saveReport) {
        log(`Save report to: ${folder}`);
        log('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
    }
}
function executeReport(configPath, config, port) {
    const { url, paths, report, chromeFlags, saveReport, disableEmulation, disableThrottling, budget, folder } = config;
    let reportFolder = null;
    if (folder) {
        reportFolder = path_1.resolve(configPath, folder);
    }
    if (saveReport && (reportFolder && !fs_1.existsSync(reportFolder))) {
        return Promise.reject(new Error(`Report folder ${reportFolder} not found`));
    }
    const opts = {
        chromeFlags,
    };
    opts.disableDeviceEmulation = disableEmulation;
    opts.disableNetworkThrottling = disableThrottling;
    opts.disableCpuThrottling = disableThrottling;
    log(`Run Report: ${url}`);
    log(`Config:`, `[${chromeFlags.join(';')}]`, coloredFlag('disableEmulation', disableEmulation), coloredFlag('disableThrottling', disableThrottling), coloredFlag('saveReport', saveReport));
    let reportPaths = paths;
    if (!Array.isArray(paths)) {
        reportPaths = [paths];
    }
    return runReports(url, reportPaths, opts, report, saveReport, budget, reportFolder, port)
        .then((results) => {
        postReport(saveReport, reportFolder);
        return results;
    });
}
exports.executeReport = executeReport;
function execute(configFile, port, logger) {
    if (!configFile) {
        throw new Error('No configfile');
    }
    if (logger) {
        log = logger;
    }
    const configFilePath = path_1.resolve(process.cwd(), configFile);
    log(`Config file: ${configFile}`);
    if (!fs_1.existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }
    const config = require(configFilePath);
    return configValidation_1.default(config)
        .then((validatedConfig) => {
        return executeReport(path_1.dirname(configFilePath), validatedConfig, port);
    });
}
exports.execute = execute;
