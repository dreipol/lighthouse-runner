import {resolve} from 'path';

import {coloredFlag, composeMetaObject} from './helper';
import {validate} from './validation/configValidation';

import {LighthouseOptionsInterface, LighthouseConfigInterface, ReportCategory, RunnerMeta} from './Interfaces';
import {existsSync} from 'fs';

import NoopPrinter from './Printer/NoopPrinter';
import PrinterInterface from './Printer/Interface';
import {runReports} from './ReportRunner';
import ResultReporterInterface from "./ResultReporter/Interface";
import NoopResultReporter from "./ResultReporter/NoopResultReporter";


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

    return runReports(meta, config, opts, port, reportPaths)
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
export function execute(configFile: string, port: Number | null, printer: PrinterInterface = new NoopPrinter(), reporter: ResultReporterInterface = new NoopResultReporter()): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        throw new Error('No config file provided');
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
