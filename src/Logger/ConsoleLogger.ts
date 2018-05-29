import {error as flError, info} from 'fancy-log';
import chalk from 'chalk';
import {LoggerInterface} from '@dreipol/lighthouse-config';

const ERROR_LEVEL = 0;
const INFO_LEVEL = 1;
const DEBUG_LEVEL = 2;

export default class ConsoleLogger implements LoggerInterface {
    protected level: number;

    constructor(level: number = 1) {
        this.level = level;
        this.debug(`Verbosity: ${level}`);
    }

    public debug(...args: string[]): void {
        if (this.level >= DEBUG_LEVEL) {
            info(chalk.green('Debug'), ...args);
        }
    }

    public error(...args: string[]): void {
        if (this.level >= ERROR_LEVEL) {
            flError(chalk.red('Error'), ...args);
        }
    }

    public info(...args: string[]): void {
        if (this.level >= INFO_LEVEL) {
            info(chalk.blue('Info'), ...args);
        }
    }

    public setLevel(level: number): void {
        this.level = level;
        this.debug(`Verbosity: ${level}`);
    }
}
