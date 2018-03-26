
import chalk from 'chalk';
import { resolve, dirname } from 'path';
import { resolve as resolveUrl } from 'url';

import runner from './lighthouseRunner';
import writeReportFile from './writeReport';
import { checkBudget, printBudget } from './budget';
import { validate } from './validation/configValidation';

import { LighthouseReportConfigInterface, LighthouseOptionsInterface, LighthouseConfigInterface, BudgetInterface, LighthouseReportResultInterface, ReportCategory } from './Interfaces';
import { existsSync } from 'fs';

import NoopPrinter from './Printer/NoopPrinter';
import PrinterInterface from './Printer/Interface';

let printer: PrinterInterface;

/**
 * Run report
 * 
 */
function runReport(host: string, paths: string, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number): Promise<Array<ReportCategory>> {
    const url = resolveUrl(host, paths);

    printer.print(chalk.blue(`Run ${url}`));

    return runner(host, paths, opts, config, port)
        .then((results: LighthouseReportResultInterface) => {
            if (saveReport && folder) {
                writeReportFile(folder, url, results);
                printer.print(`Report created and saved`);
            }

            const categories = results.reportCategories;
            let allBudgetsReached = true;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                category.score = Math.round(category.score);

                const isReached = checkBudget(category, budget);
                let budgetText = printBudget(category, budget);

                if (isReached === true) {
                    budgetText = chalk.green(budgetText);
                }
                if (isReached === false) {
                    budgetText = chalk.red(budgetText);
                    allBudgetsReached = false;
                }

                printer.print(budgetText);
            }

            if (allBudgetsReached) {
                printer.print(chalk.bgGreen('Congrats! Budged reached!'));
            }
            return categories;
        });
}

/**
 * Run multiple urls synchronously
 */
function runReports(url: string, paths: Array<string>, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number, allResults: Array<Object> = []): Promise<any> {
    const urlPath = paths.shift();
    printer.print(''.padStart(10, '-'));

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
        printer.print(`Save report to: ${folder}`);
        printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
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

    printer.print(`Run Report: ${url}`);

    printer.print(`Config:`,
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
export function execute(configFile: string, port?: Number, logger?: PrinterInterface): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        throw new Error('No configfile');
    }

    if (logger) {
        printer = logger;
    } else {
        printer = new NoopPrinter();
    }

    const configFilePath = resolve(process.cwd(), configFile);
    printer.print(`Config file: ${configFile}`);
    if (!existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }

    const config = require(configFilePath);

    return validate(config)
        .then((validatedConfig) => {
            return executeReport(dirname(configFilePath), validatedConfig, port);
        })
}