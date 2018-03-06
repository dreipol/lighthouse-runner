const log = require('fancy-log');
const chalk = require('chalk');

/**
 * Check scores against configured budget and make colored output
 *
 * @param {string} categoryId
 * @param {string} name
 * @param {Number} score
 * @param {Object} budget
 * @return {boolean}
 */
module.exports = function checkBudget(categoryId, name, score, budget) {
    const threshhold = budget[categoryId];
    if (threshhold === false) {
        log(name, score);
        return null;
    }

    if (score >= threshhold) {
        log(chalk.green(`${name}: ${score}/${threshhold}`));
        return true;
    } else {
        log(chalk.red(`${name}: ${score}/${threshhold}`));
        return false;
    }
}