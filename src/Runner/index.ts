import {resolve} from 'path';

import {coloredFlag, composeMetaObject} from './helper';
import {validate} from './validation/configValidation';
import {setupFolder} from './writeReport';

import {LighthouseOptionsInterface, LighthouseConfigInterface, ReportCategory, RunnerMeta} from './Interfaces';
import {existsSync} from 'fs';

import NoopPrinter from './Printer/NoopPrinter';
import PrinterInterface from './Printer/Interface';
import {runReports} from './ReportRunner';
import ResultReporterInterface from "./ResultReporter/Interface";


/**
 * Run report with config
 *
 */
export function executeReport(meta: RunnerMeta, config: LighthouseConfigInterface, port: Number | null): Promise<Array<Array<ReportCategory>>> {
    const {url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling, folder} = config;
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

    return setupFolder(saveReport, meta.reportFolder)
        .then(() => {
            return runReports(meta, config, opts, port, reportPaths)
        })
        .then((results) => {
            if (saveReport) {
                printer.print(`Save report to: ${folder}`);
                printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
            }
            return results;
        });
}


/**
 * Execute reporter
 *
 */
export function execute(configFile: string, port: Number | null, logger: PrinterInterface | null, reporter: ResultReporterInterface): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        throw new Error('No configfile');
    }

    let printer = new NoopPrinter();
    if (logger) {
        printer = logger;
    }

    const configFilePath = resolve(process.cwd(), configFile);
    printer.print(`Config file: ${configFile}`);
    if (!existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }

    const config = require(configFilePath);

    const meta = composeMetaObject(configFile, config, printer, reporter);

    return validate(config)
        .then((validatedConfig) => {
            return executeReport(meta, validatedConfig, port);
        })
}
