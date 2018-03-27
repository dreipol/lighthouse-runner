import chalk from 'chalk';

/**
 * Output colored flags
 *
 */
export function coloredFlag(name: string, flag: Boolean): string {
    if (flag === true) {
        return chalk.green(name);
    }
    return chalk.red(name);
}