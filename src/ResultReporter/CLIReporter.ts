import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
import ReportCategory from '../Interfaces/ReportCategory';
import chalk from 'chalk';
import {Budget} from '@dreipol/lighthouse-config';

require('console.table');

export default class CLIReporter extends AbstractResultReporter {
    public key = 'CLIReporter';

    public async handle(url: string, results: LighthouseReportResult): Promise<void> {
        const categories = results.reportCategories;
        const {budget} = this.config;
        this.logger.debug(`Report: ${url}`);
        await this.printResults(categories, budget);
    }

    private checkBudget(caregory: ReportCategory, budget: Budget): boolean | null {
        const {id, score} = caregory;
        const threshhold = budget[id];

        if (threshhold === undefined || threshhold === null) {
            return null;
        }

        return score >= threshhold;
    }

    private async printResults(categories: ReportCategory[], budget: Budget): Promise<void> {
        let allBudgetsReached = true;
        const results = [];

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            category.score = Math.round(category.score);

            const isReached = this.checkBudget(category, budget);

            let budgetText = chalk.green(category.score.toString());

            if (isReached === false) {
                budgetText = chalk.red(category.score.toString());
                allBudgetsReached = false;
            }

            results.push({
                Category: category.name,
                Score: budgetText,
                Budget: budget[category.id] ? budget[category.id] : '',
            });
        }

        console.table(results);

        if (allBudgetsReached) {
            console.log(chalk.black.bgGreen('Congrats! Budged reached!'));
        }
    }
}
