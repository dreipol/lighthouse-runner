import chalk from 'chalk';
import {dirname, resolve} from "path";

import LoggerInterface from "./Logger/LoggerInterface";
import ResultPersisterInterface from "./ResultPersister/ResultPersisterInterface";
import {LighthouseConfigInterface, RunnerMeta} from "./Interfaces";

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
 * @param {string} configFile
 * @param {LighthouseConfigInterface} config
 * @param {PrinterInterface} printer
 * @param {ResultPersisterInterface} reporter
 * @return {RunnerMeta}
 */
export function composeMetaObject(configFile: string, config: LighthouseConfigInterface, printer: LoggerInterface, persisters: Array<ResultPersisterInterface>): RunnerMeta {
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
        persisters
    }
}
