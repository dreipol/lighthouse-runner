
import { resolve, dirname } from 'path';

import { coloredFlag } from './helper';
import { validate } from './validation/configValidation';
import { setupFolder } from './writeReport';

import { LighthouseOptionsInterface, LighthouseConfigInterface, ReportCategory } from './Interfaces';
import { existsSync } from 'fs';

import NoopPrinter from './Printer/NoopPrinter';
import PrinterInterface from './Printer/Interface';
import { runReports } from './ReportRunner';

let printer: PrinterInterface;

/**
 * Run report with config
 * 
 */
export function executeReport(configPath: string, config: LighthouseConfigInterface, port?: Number): Promise<Array<Array<ReportCategory>>> {
    const { url, paths, report, chromeFlags, saveReport, disableEmulation, disableThrottling, budget, folder } = config;

    let reportFolder: string | null = null;
    if (folder) {
        reportFolder = resolve(configPath, folder);
    }

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

    return setupFolder(saveReport, reportFolder)
        .then(() => {
            return runReports(printer, url, reportPaths, opts, report, saveReport, budget, reportFolder, port)
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
export function execute(configFile: string, port?: Number, logger?: PrinterInterface): Promise<Array<Array<ReportCategory>>> {
    if (!configFile) {
        throw new Error('No configfile');
    }

    if (logger) {
        printer = logger;
    } else {
        printer = new NoopPrinter();
    }

    const configFilePath = resolve(process.cwd(), configFile);
    printer.print(`Config file: ${configFile}`);
    if (!existsSync(configFile)) {
        return Promise.reject(new Error(`File not found at ${configFile}`));
    }

    const config = require(configFilePath);

    return validate(config)
        .then((validatedConfig) => {
            return executeReport(dirname(configFilePath), validatedConfig, port);
        })
}