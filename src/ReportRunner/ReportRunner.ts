import RunnerMeta from "../Interfaces/RunnerMeta";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseOptions from "../Interfaces/LighthouseOptions";
import {resolve as resolveUrl} from "url";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import chalk from "chalk";
import LighthouseRunner from "../LighthouseRunner/LighthouseRunner";
import ReportCategory from "../Interfaces/ReportCategory";
import {checkBudget, getScoreString} from "../utils/budget";
import BudgetInterface from "../Interfaces/BudgetInterface";
import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";

export default class ReportRunner {
    config: LighthouseConfigInterface;
    port: Number | null;
    opts: LighthouseOptions;
    meta: RunnerMeta;
    persisters: ResultReporterInterface[];


    constructor(config: LighthouseConfigInterface, port: Number | null, opts: LighthouseOptions, meta: RunnerMeta, persisters: ResultReporterInterface[]) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.meta = meta;
        this.persisters = persisters;
    }

    private async printResults(categories: Array<ReportCategory>, budget: BudgetInterface): Promise<void> {
        const {printer} = this.meta;

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

    private async runPersisters(site: string, results: LighthouseReportResultInterface): Promise<void> {
        this.persisters.forEach(async(persister) => {
            await persister.setup();
            await persister.handle(site, results);
        });
    }

    private async runReport(path: string): Promise<LighthouseReportResultInterface> {

        const {url, budget, report} = this.config;
        const {printer} = this.meta;
        const site = resolveUrl(url, path);

        printer.print(chalk.blue(`Run ${site}`));

        const runner = new LighthouseRunner();
        const results = await runner.runReport(url, path, this.opts, report, this.port);
        const categories = results.reportCategories;
        this.printResults(categories, budget);

        await this.runPersisters(site, results);
        return results;
    }

    public async createReports(paths: Array<string>, allResults: Array<Object> = []): Promise<any> {
        const urlPath = paths.shift();
        const {printer} = this.meta;

        printer.print(''.padStart(10, '-'));

        if (!urlPath) {
            return Promise.resolve();
        }

        const results = await this.runReport(urlPath);
        allResults.push(results);

        if (paths.length > 0) {
            return this.createReports(paths, allResults);
        }

        return allResults;
    }

}