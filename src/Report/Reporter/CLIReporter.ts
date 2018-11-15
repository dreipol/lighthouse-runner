import AbstractReporter from '../AbstractReporter';
import IReportCategory from '../../Interfaces/IReportCategory';
import chalk from 'chalk';
import IReportResult from '../../Interfaces/IReportResult';
import { IBudget } from '../../Interfaces/IBudget';

const figures = require('figures');

require('console.table');

export default class CLIReporter extends AbstractReporter {
    public key = 'CLIReporter';

    public async handle(url: string, results: IReportResult): Promise<void> {
        const categories = results.categoryGroups;
        const { budget } = this.config;
        this.logger.debug(`Report: ${url}`);

        await this.printResults(url, categories, budget);
    }

    private checkBudget(caregory: IReportCategory, budget: IBudget): boolean | null {
        const { id, score } = caregory;
        const threshhold = budget[id];

        if (threshhold === undefined || threshhold === null) {
            return null;
        }

        return score >= threshhold;
    }

    private async printResults(url: string, categories: IReportCategory[], budget: IBudget): Promise<void> {
        let allBudgetsReached = true;
        const results = [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            category.score = Math.round(category.score * 100) / 100;

            const isReached = this.checkBudget(category, budget);

            let budgetText = category.score.toString();
            let status = figures.line;

            if (isReached === true) {
                status = chalk.green(figures.tick);
                budgetText = chalk.green(category.score + '');
            }
            if (isReached === false) {
                budgetText = chalk.red(category.score + '');
                status = chalk.red(figures.cross);
                allBudgetsReached = false;
            }

            results.push({
                Category: category.title,
                Status: status,
                Score: budgetText,
                Budget: budget[category.id] ? budget[category.id] : '',
            });
        }

        console.log(chalk.blue(url));
        console.table(results);

        if (allBudgetsReached) {
            console.log(chalk.black.bgGreen('Congrats! Budged reached!'));
        }
    }
}
