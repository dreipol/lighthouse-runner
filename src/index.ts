import {resolve} from 'path';
import {existsSync} from 'fs';

import {coloredFlag, composeMetaObject, remapPersisterNames} from './helper';
import {validate} from './validation/configValidation';
import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Interfaces/LoggerInterface';
import {runReports} from './ReportRunner';
import RunnerMeta from "./Interfaces/RunnerMeta";
import LighthouseConfigInterface from "./Interfaces/LighthouseConfigInterface";
import ReportCategory from "./Interfaces/ReportCategory";
import LighthouseOptions from "./Interfaces/LighthouseOptions";


/**
 * Run report with config
 *
 */
export function executeReport(meta: RunnerMeta, config: LighthouseConfigInterface, port: Number | null): Promise<Array<Array<ReportCategory>>> {
    const {url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling} = config;
    const {printer} = meta;

    const opts: LighthouseOptions = {
        chromeFlags,
    };

    opts.disableDeviceEmulation = disableEmulation;
    opts.disableNetworkThrottling = disableThrottling;
    opts.disableCpuThrottling = disableThrottling;

    printer.print(`Run Report: ${url}`);

    printer.print(`Config:`,
        `[${chromeFlags.join(';')}]`,
        coloredFlag('disableEmulation', disableEmulation),
        coloredFlag('disableThrottling', disableThrottling),
        coloredFlag('saveReport', saveReport)
    );

    let reportPaths: Array<string> = paths;

    if (!Array.isArray(paths)) {
        reportPaths = [paths];
    }

    return runReports(meta, config, opts, port, reportPaths)
}

/**
 * Execute reporter
 *
 */
export function execute(configFile: string, port: Number | null, printer: LoggerInterface = new NoopPrinter()): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        return Promise.reject(new Error('No config file provided'));
    }

    const configFilePath = resolve(process.cwd(), configFile);
    printer.print(`Config file: ${configFile}`);
    if (!existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }

    let config: LighthouseConfigInterface = require(configFilePath);
    printer.print(`Using persisters: ${config.persisters.modules}`);
    config = remapPersisterNames(config);

    const meta = composeMetaObject(configFile, config, printer);

    return validate(config)
        .then((validatedConfig: LighthouseConfigInterface) => {
            return executeReport(meta, validatedConfig, port);
        });
}
