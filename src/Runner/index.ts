
import chalk from 'chalk';
import { info as log } from 'fancy-log';
import { resolve, dirname } from 'path';
import { resolve as resolveUrl } from 'url';

import runner from './lighthouseRunner';
import writeReportFile from './writeReport';
import printBudget from './printBudget';
import checkBudget from './checkBudget';

import { LighthouseReportConfigInterface, LighthouseOptionsInterface, LighthouseConfigInterface, BudgetInterface, LighthouseReportResultInterface } from './Interfaces';

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
function runReport(host: string, paths: string, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number): Promise<any> {
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
            return;
        });
}

/**
 * Run multiple urls synchronously
 */
function runReports(url: string, paths: Array<string>, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number): Promise<any> {
    const urlPath = paths.shift();
    log(''.padStart(10, '-'));

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
        .catch((e: Error) => console.error(e));
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
export function executeReport(configPath: string, config: LighthouseConfigInterface, port?: Number): Promise<void> {
    const { url, paths, report, chromeFlags, saveReport, disableEmulation, disableThrottling, budget, folder } = config;

    let reportFolder: string | null = null;
    if (folder) {
        reportFolder = resolve(configPath, folder);
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

/**
 * Execute reporter
 * 
 */
export function execute(configFile: string, port?: Number): void {
    if (!configFile) {
        throw new Error('No configfile');
    }

    const configFilePath = resolve(process.cwd(), configFile);
    log(`Config file: ${configFile}`);
    executeReport(dirname(configFilePath), require(configFilePath), port)
}