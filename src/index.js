
const chalk = require('chalk');
const log = require('fancy-log');
const path = require('path');
const url = require('url');

const runner = require('./lighthouseRunner');
const writeReportFile = require('./writeReport');
const {coloredFlag, printBudget} = require('./printer.js');
const checkBudget = require('./budget');

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
function runReport(host, paths, opts, config, saveReport, budget, folder, port) {
    let _url = url.resolve(host, paths);

    log(chalk.blue(`Run ${_url}`));
    
    return runner(host, paths, opts, config, port)
        .then((results) => {
            if (saveReport) {
                writeReportFile(folder, _url, results);
                log(`Report created and saved`);
            }

            const categories = results.reportCategories;
            let allBudgetsReached = true;
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const score = Math.round(category.score);
                const budgetReached = checkBudget(category.id, category.name, score, budget);
                printBudget(category.id, category.name, score, budget)

                if (budgetReached === false) {
                    allBudgetsReached = false;
                }
            }

            if (allBudgetsReached) {
                log(chalk.bgGreen('Congrats! Budged reached!'));
            }
        })
}
/**
 * Run multiple urls synchronously
 *
 * @param {string[]} paths
 * @param {Object} opts
 * @param {Object} config
 * 
 * @returns {Promise}
 */
function runReports(url, paths, opts, config, saveReport, budget, folder, port) {
    const urlPath = paths.shift();
    log(''.padStart(10, '-'));

    return runReport(url, urlPath, opts, config, saveReport, budget, folder, port)
        .then(() => {
            if (paths.length > 0) {
                return runReports(url, paths, opts, config, saveReport, budget, folder, port);
            }
            return null;
        });
}

/**
 * Execute reporter
 * 
 * @param {string} configFile 
 * @param {number|null} port 
 * 
 * @returns {Promise}
 */
function execute(configFile, port) {
    if(!configFile){
        throw new Error('No configfile');
    }


    const configFilePath = path.resolve(process.cwd(), configFile);
    const { url, paths, report, chromeFlags, saveReport, disableEmulation, disableThrottling, budget, folder} = require(configFilePath);
    console.log(folder);
    let reportFolder = null;
    if(folder){
        reportFolder = path.resolve(path.dirname(configFilePath), folder);
    }

    const opts = {
        chromeFlags,
    };

    opts.disableDeviceEmulation = disableEmulation;
    opts.disableNetworkThrottling = disableThrottling;
    opts.disableCpuThrottling = disableThrottling;

    log(`Run Report: ${url}`);
    log(`Config file: ${configFile}`);

    if (saveReport) {
        log(`Save report to: ${folder}`);
        log('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
    }

    log(`Config:`,
        `[${chromeFlags.join(';')}]`,
        coloredFlag('disableEmulation', disableEmulation),
        coloredFlag('disableThrottling', disableThrottling),
        coloredFlag('saveReport', saveReport)
    );

    if (!Array.isArray(paths)) {
        return runReport(url, paths, opts, report, saveReport, budget, folder, port);
    }

    return runReports(url, paths, opts, report, saveReport, budget, folder, port);
}

module.exports = execute;
