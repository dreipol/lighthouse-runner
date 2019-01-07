import {error as flError, info} from 'fancy-log';
import chalk from 'chalk';
import {ILogger} from "./ILogger";

export const ERROR_LEVEL = 1;
export const INFO_LEVEL = 2;
export const DEBUG_LEVEL = 3;

export default class ConsoleLogger implements ILogger {
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
    
    public getLevel(){
        return this.level;
    }
}
