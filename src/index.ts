import {resolve} from 'path';

import {coloredFlag, composeMetaObject} from './helper';
import {validate} from './validation/configValidation';

import {LighthouseOptionsInterface, LighthouseConfigInterface, ReportCategory, RunnerMeta} from './Interfaces';
import {existsSync} from 'fs';

import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Logger/LoggerInterface';
import {runReports} from './reportRunner';
import ResultPersisterInterface from "./ResultPersister/ResultPersisterInterface";
import NoopResultPersister from "./ResultPersister/NoopResultPersister";


/**
 * Run report with config
 *
 */
export function executeReport(meta: RunnerMeta, config: LighthouseConfigInterface, port: Number | null): Promise<Array<Array<ReportCategory>>> {
    const {url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling} = config;
    const {printer} = meta;

    const opts: LighthouseOptionsInterface = {
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
export function execute(configFile: string, port: Number | null, printer: LoggerInterface = new NoopPrinter(), persisters: Array<ResultPersisterInterface> = [new NoopResultPersister()]): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        return Promise.reject(new Error('No config file provided'));
    }

    const configFilePath = resolve(process.cwd(), configFile);
    printer.print(`Config file: ${configFile}`);
    if (!existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }

    const config = require(configFilePath);

    const meta = composeMetaObject(configFile, config, printer, persisters);

    // @ts-ignore
    return validate(config)
        .then((validatedConfig) => {
            return executeReport(meta, validatedConfig, port);
        })
        .catch( (e) =>{
            console.error(e);
        })
}
