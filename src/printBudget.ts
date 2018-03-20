import BudgetInterface from './Interfaces/BudgetInterface';
import log from 'fancy-log';
import chalk from 'chalk';

/**
 * Print budget scores to cli
 * 
 * @param {string} categoryId 
 * @param {string} name 
 * @param {number} score 
 * @param {Object} budget 
 * 
 */
export default function printBudget(categoryId: string, name: string, score: Number, budget: BudgetInterface): void {
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