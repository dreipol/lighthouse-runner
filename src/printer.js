const log = require('fancy-log');
const chalk = require('chalk');

/**
 * Print budget scores to cli
 * 
 * @param {string} categoryId 
 * @param {string} name 
 * @param {number} score 
 * @param {Object} budget 
 * @returns 
 */
function printBudget(categoryId, name, score, budget) {
    const threshhold = budget[categoryId];
    if (threshhold === false) {
        log(name, score);
        return;
    }

    if (score >= threshhold) {
        log(chalk.green(`${name}: ${score}/${threshhold}`));
    } else {
        log(chalk.red(`${name}: ${score}/${threshhold}`));
    }
}

module.exports = {
    printBudget
};