
import chalk from 'chalk';
import { resolve, dirname } from 'path';
import { resolve as resolveUrl } from 'url';

import runner from './lighthouseRunner';
import writeReportFile from './writeReport';
import checkBudget from './checkBudget';
import validator from './configValidation';

import { LighthouseReportConfigInterface, LighthouseOptionsInterface, LighthouseConfigInterface, BudgetInterface, LighthouseReportResultInterface, ReportCategory } from './Interfaces';
import { existsSync } from 'fs';

let log: Function = console.log;

/**
 * Run report
 * 
 * @param {string} host 
 * @param {string[]|string} paths 
 * @param {Object} opts 
 * @param {Object} config 
 * @param {boolean} saveReport 
 * @param {object} budget 
 * @param {string|null} folder 
 * @param {number|null} port 
 * 
 * @returns {Promise}
 */
function runReport(host: string, paths: string, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number): Promise<Array<ReportCategory>> {
    const url = resolveUrl(host, paths);

    log(chalk.blue(`Run ${url}`));

    return runner(host, paths, opts, config, port)
        .then((results: LighthouseReportResultInterface) => {
            if (saveReport && folder) {
                writeReportFile(folder, url, results);
                log(`Report created and saved`);
            }

            const categories = results.reportCategories;
            let allBudgetsReached = true;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const score = Math.round(category.score);
                const budgetReached = checkBudget(category.id, score, budget);
                printBudget(category.id, category.name, score, budget);

                if (budgetReached === false) {
                    allBudgetsReached = false;
                }
            }

            if (allBudgetsReached) {
                log(chalk.bgGreen('Congrats! Budged reached!'));
            }
            return categories;
        });
}

/**
 * Run multiple urls synchronously
 */
function runReports(url: string, paths: Array<string>, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number, allResults: Array<Object> = []): Promise<any> {
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
        .catch((e: Error) => console.error(e));
}

/**
 * Print colored budget
 * @param categoryId 
 * @param name 
 * @param score 
 * @param budget 
 */
function printBudget(categoryId: string, name: string, score: Number, budget: BudgetInterface): void {
    const threshhold = budget[categoryId];

    if (threshhold === false || threshhold === undefined || threshhold === null) {
        log(name, score);
        return;
    }

    if (score >= threshhold) {
        log(chalk.green(`${name}: ${score}/${threshhold}`));
    } else {
        log(chalk.red(`${name}: ${score}/${threshhold}`));
    }
}

/**
 * Output colored flags
 *
 */
function coloredFlag(name: string, flag: Boolean): string {
    if (flag === true) {
        return chalk.green(name);
    }
    return chalk.red(name);
}

/**
 * Run post code after report finished
 * 
 */
function postReport(saveReport: Boolean, folder: string | null): void {
    if (saveReport) {
        log(`Save report to: ${folder}`);
        log('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
    }
}


/**
 * Run report with config
 * 
 */
export function executeReport(configPath: string, config: LighthouseConfigInterface, port?: Number): Promise<Array<Array<ReportCategory>>> {
    const { url, paths, report, chromeFlags, saveReport, disableEmulation, disableThrottling, budget, folder } = config;

    let reportFolder: string | null = null;
    if (folder) {
        reportFolder = resolve(configPath, folder);
    }

    if (saveReport && (reportFolder && !existsSync(reportFolder))) {
        return Promise.reject(new Error(`Report folder ${reportFolder} not found`))
    }

    const opts: LighthouseOptionsInterface = {
        chromeFlags,
    };

    opts.disableDeviceEmulation = disableEmulation;
    opts.disableNetworkThrottling = disableThrottling;
    opts.disableCpuThrottling = disableThrottling;

    log(`Run Report: ${url}`);

    log(`Config:`,
        `[${chromeFlags.join(';')}]`,
        coloredFlag('disableEmulation', disableEmulation),
        coloredFlag('disableThrottling', disableThrottling),
        coloredFlag('saveReport', saveReport)
    );

    let reportPaths: Array<string> = paths;

    if (!Array.isArray(paths)) {
        reportPaths = [paths];
    }

    return runReports(url, reportPaths, opts, report, saveReport, budget, reportFolder, port)
        .then((results) => {
            postReport(saveReport, reportFolder);
            return results;
        });
}

/**
 * Execute reporter
 * 
 */
export function execute(configFile: string, port?: Number, logger?: Function): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        throw new Error('No configfile');
    }

    if (logger) {
        log = logger;
    }

    const configFilePath = resolve(process.cwd(), configFile);
    log(`Config file: ${configFile}`);
    if (!existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }

    const config = require(configFilePath);

    return validator(config)
        .then((validatedConfig) => {
            return executeReport(dirname(configFilePath), validatedConfig, port);
        })
}