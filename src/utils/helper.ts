import chalk from 'chalk';
import { dirname, resolve } from "path";

import LoggerInterface from "../Interfaces/LoggerInterface";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import RunnerMeta from "../Interfaces/RunnerMeta";


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

/**
 *
 * Create meta object that is available nearly everywhere
 */
export function composeMetaObject(configFile: string, config: LighthouseConfigInterface, printer: LoggerInterface): RunnerMeta {
    let reportFolder: string | null = null;
    const configPath = dirname(configFile);

    if (config.folder) {
        reportFolder = resolve(configPath, config.folder);
    }

    return {
        configFile,
        configFolder: configPath,
        reportFolder,
        printer,
    }
}
