import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
import AbstractResultReporter from "./AbstractResultReporter";
import ReportCategory from "../Interfaces/ReportCategory";
import chalk from "chalk";
import Budget from "../Interfaces/Config/Budget";

export default class CLIReporter extends AbstractResultReporter {

    async setup(): Promise<void> {
    }

    private checkBudget(caregory: ReportCategory, budget: Budget): Boolean | null {
        const {id, score} = caregory;
        const threshhold = budget[id];

        if (threshhold === undefined || threshhold === null) {
            return null;
        }

        if (score >= threshhold) {
            return true;
        } else {
            return false;
        }
    }

    private getScoreString(category: ReportCategory, budget: Budget): string {
        const {id, name, score} = category;
        const threshhold = budget[id];

        if (threshhold === undefined || threshhold === null || threshhold === false) {
            return `${name}: ${score}`;
        }

        return `${name}: ${score}/${threshhold}`;
    }

    private async printResults(categories: Array<ReportCategory>, budget: Budget): Promise<void> {
        let allBudgetsReached = true;
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            category.score = Math.round(category.score);

            const isReached = this.checkBudget(category, budget);
            let budgetText = this.getScoreString(category, budget);

            if (isReached === true) {
                budgetText = chalk.green(budgetText);
            }
            if (isReached === false) {
                budgetText = chalk.red(budgetText);
                allBudgetsReached = false;
            }

            this.logger.print(budgetText);
        }

        if (allBudgetsReached) {
            this.logger.print(chalk.bgGreen('Congrats! Budged reached!'));
        }
    }

    async handle(url: string, results: LighthouseReportResult): Promise<void> {
        const categories = results.reportCategories;
        const {budget} = this.config;
        this.logger.print(`Report: ${url}`);
        this.logger.print(''.padStart(10, '-'));
        await this.printResults(categories, budget)
    }
}
