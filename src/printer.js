const chalk = require('chalk');

/**
 * Output colored flags
 *
 * @param {string} name
 * @param {Boolean} flag
 * @return {*|string}
 */
function coloredFlag(name, flag) {
    if (flag === true) {
        return chalk.green(name);
    }
    return chalk.red(name);
}

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
    coloredFlag,
    printBudget
}