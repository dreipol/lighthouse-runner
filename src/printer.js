const chalk = require('chalk');

/**
 * Output colored flags
 *
 * @param {string} name
 * @param {Boolean} flag
 * @return {*|string}
 */
module.exports = function coloredFlagOutput(name, flag) {
    if (flag === true) {
        return chalk.green(name);
    }
    return chalk.red(name);
}
