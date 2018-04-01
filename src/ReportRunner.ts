import {resolve as resolveUrl} from 'url';
import chalk from 'chalk';

import runner from './lighthouseRunner';
import {checkBudget, getScoreString} from './budget';

import {
    LighthouseOptionsInterface,
    LighthouseReportResultInterface,
    LighthouseConfigInterface,
    RunnerMeta, ReportCategory, BudgetInterface, PersisterConfigInterface
} from './Interfaces';

/**
 * Postprocess the result from the reporter
 */
function handleResult(meta: RunnerMeta, categories: Array<ReportCategory>, budget: BudgetInterface): void {
    const {printer} = meta;

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
}

/**
 * Run all configured persisters
 */
function runPersisters(meta: RunnerMeta, config: LighthouseConfigInterface, site: string, results: LighthouseReportResultInterface, persisters: PersisterConfigInterface):Promise<Array<void>> {
    const promises = [];
    const modules = persisters.modules;
    if (modules) {
        for (let i = 0; i < modules.length; i++) {
            const persister = modules[i];
            promises.push(
                //@ts-ignore
                persister(meta, config, site, results)
            );
        }
    }

    return Promise.all(promises)
}

/**
 * Run report
 *
 */
function runReport(meta: RunnerMeta,
                   config: LighthouseConfigInterface,
                   path: string,
                   opts: LighthouseOptionsInterface,
                   port: Number | null): Promise<Array<ReportCategory>> {

    const {url, budget, report, persisters} = config;
    const {printer} = meta;
    const site = resolveUrl(url, path);

    printer.print(chalk.blue(`Run ${site}`));

    return runner(url, path, opts, report, port)
        .then((results: LighthouseReportResultInterface) => {
            const categories = results.reportCategories;
            handleResult(meta, categories, budget);

            return runPersisters(meta, config, site, results, persisters)
                .then(() => {
                    return categories;
                })
        })

}

/**
 * Run multiple urls synchronously
 */
export function runReports(meta: RunnerMeta, config: LighthouseConfigInterface, opts: LighthouseOptionsInterface, port: Number | null, paths: Array<string>, allResults: Array<Object> = []): Promise<any> {
    const urlPath = paths.shift();
    const {printer} = meta;

    printer.print(''.padStart(10, '-'));

    if (!urlPath) {
        return Promise.resolve();
    }

    return runReport(meta, config, urlPath, opts, port)
        .then((results) => {
            allResults.push(results);

            if (paths.length > 0) {
                return runReports(meta, config, opts, port, paths, allResults);
            }

            return allResults;
        })
        .catch((e: Error) => console.error(e));
}