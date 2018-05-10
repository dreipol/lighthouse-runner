import {dirname, resolve} from 'path';
import {existsSync} from 'fs';

import {coloredFlag} from './utils/helper';
import ConfigValidator from './Validator/ConfigValidator';
import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Logger/LoggerInterface';
import ReportRunner from './ReportRunner/ReportRunner';
import LighthouseConfigInterface from "./Interfaces/LighthouseConfigInterface";
import ReportCategory from "./Interfaces/ReportCategory";
import LighthouseOptions from "./Interfaces/LighthouseOptions";
import ReporterModuleLoader from "./ReporterModuleLoader/ReporterModuleLoader";


export default class Dreihouse {
    configFile: string;
    config: LighthouseConfigInterface;
    logger: LoggerInterface;

    constructor(configFile: string, logger: LoggerInterface = new NoopPrinter()) {
        this.configFile = configFile;
        this.logger = logger;

        const configFilePath = resolve(process.cwd(), this.configFile);
        logger.print(`Config file: ${this.configFile}`);
        if (!existsSync(this.configFile)) {
            throw new Error(`File not found at ${this.configFile}`);
        }

        this.config = ConfigValidator.validate(require(configFilePath));
    }

    private async executeReport(reportFolder: string, port: Number | null): Promise<Array<Array<ReportCategory>>> {
        const {url, paths, chromeFlags, saveReport, disableEmulation, disableThrottling} = this.config;

        const opts: LighthouseOptions = {
            chromeFlags,
        };

        opts.disableDeviceEmulation = disableEmulation;
        opts.disableNetworkThrottling = disableThrottling;
        opts.disableCpuThrottling = disableThrottling;

        this.logger.print(`Run Report: ${url}`);

        this.logger.print(`Config:`,
            `[${chromeFlags.join(';')}]`,
            coloredFlag('disableEmulation', disableEmulation),
            coloredFlag('disableThrottling', disableThrottling),
            coloredFlag('saveReport', saveReport)
        );

        let reportPaths: Array<string> = paths;

        if (!Array.isArray(paths)) {
            reportPaths = [paths];
        }

        const reporters = ReporterModuleLoader.load(reportFolder, this.config, this.logger, this.config.persisters.modules);
        const runner = new ReportRunner(this.logger, this.config, port, opts, reporters);
        return await runner.createReports(reportPaths)
    }

    public async execute(port: Number | null): Promise<Array<ReportCategory[]>> {
        this.logger.print(`Using persisters: ${this.config.persisters.modules}`);
        const reportFolder = resolve(dirname(this.configFile), this.config.folder);
        return await this.executeReport(reportFolder, port);
    }
}
