import chalk from 'chalk';
import { dirname, resolve } from "path";

import LoggerInterface from "./Logger/LoggerInterface";
import { LighthouseConfigInterface, RunnerMeta, MappedPersisterNameToFileInterface } from "./Interfaces";

const MAPPED_PERSISTERS: MappedPersisterNameToFileInterface = {
    'html': './ResultPersister/HTMLResultPersister',
    'html-dashboard': './ResultPersister/HTMLDashboardResultPersister',
    'json-dashboard': './ResultPersister/JsonDashboardResultPersister',
    'json': './ResultPersister/JsonResultPersister',
};

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

/**
 * <remap given n persister names to functions
 */
export function remapPersisterNames(config: LighthouseConfigInterface) {
    const { modules } = config.persisters;
    if (!modules) {
        return config;
    }
    let mappedModules = [];
    for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        if (typeof module === 'string') {
            const funcFile = MAPPED_PERSISTERS[module];
            if (funcFile) {
                mappedModules.push(require(funcFile).default);
            }
        }

        if (typeof module === 'function') {
            mappedModules.push(module);
        }
    }

    config.persisters.modules = mappedModules;

    return config;
}
