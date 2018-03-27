
import { resolve as resolveUrl } from 'url';
import chalk from 'chalk';

import PrinterInterface from './Printer/Interface';
import writeReportFile from './writeReport';
import runner from './lighthouseRunner';
import { checkBudget, getScoreString } from './budget';

import { LighthouseReportConfigInterface, LighthouseOptionsInterface, BudgetInterface, LighthouseReportResultInterface, ReportCategory } from './Interfaces';

/**
 * Run report
 * 
 */
function runReport(printer: PrinterInterface, host: string, paths: string, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number): Promise<Array<ReportCategory>> {
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
                let budgetText = getScoreString(category, budget);

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
export function runReports(printer: PrinterInterface, url: string, paths: Array<string>, opts: LighthouseOptionsInterface, config: LighthouseReportConfigInterface, saveReport: Boolean, budget: BudgetInterface, folder?: string | null, port?: Number, allResults: Array<Object> = []): Promise<any> {
    const urlPath = paths.shift();
    printer.print(''.padStart(10, '-'));

    if (!urlPath) {
        return Promise.resolve();
    }

    return runReport(printer, url, urlPath, opts, config, saveReport, budget, folder, port)
        .then((results) => {
            allResults.push(results);

            if (paths.length > 0) {
                return runReports(printer, url, paths, opts, config, saveReport, budget, folder, port, allResults);
            }

            return allResults;
        })
        .catch((e: Error) => console.error(e));
}
