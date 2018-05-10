import {dirname, resolve} from 'path';
import {existsSync} from 'fs';

import ConfigValidator from './Validator/ConfigValidator';
import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Logger/LoggerInterface';
import ReportRunner from './ReportRunner/ReportRunner';
import DreihouseConfig from "./Interfaces/Config/DreihouseConfig";
import ReportCategory from "./Interfaces/ReportCategory";
import LighthouseOptions from "./Interfaces/LighthouseOptions";
import ReporterModuleLoader from "./ReporterModuleLoader/ReporterModuleLoader";

export default class Dreihouse {
    configFile: string;
    config: DreihouseConfig;
    logger: LoggerInterface;

    constructor(configFile: string, logger: LoggerInterface = new NoopPrinter()) {
        this.configFile = configFile;
        this.logger = logger;

        const configFilePath = resolve(process.cwd(), this.configFile);
        if (!existsSync(this.configFile)) {
            throw new Error(`File not found at ${this.configFile}`);
        }

        this.config = ConfigValidator.validate(require(configFilePath));
    }

    private async executeReport(reportFolder: string, port: Number | null): Promise<Array<Array<ReportCategory>>> {
        const {paths, chromeFlags, disableEmulation, disableThrottling} = this.config;

        const opts: LighthouseOptions = {
            chromeFlags,
        };

        opts.disableDeviceEmulation = disableEmulation;
        opts.disableNetworkThrottling = disableThrottling;
        opts.disableCpuThrottling = disableThrottling;

        let reportPaths: Array<string> = paths;

        if (!Array.isArray(paths)) {
            reportPaths = [paths];
        }

        const reporters = ReporterModuleLoader.load(reportFolder, this.config, this.logger, this.config.reporters.modules);
        const runner = new ReportRunner(this.logger, this.config, port, opts, reporters);
        return await runner.createReports(reportPaths)
    }

    public async execute(port: Number | null): Promise<Array<ReportCategory[]>> {
        const reportFolder = resolve(dirname(this.configFile), this.config.folder);
        return await this.executeReport(reportFolder, port);
    }
}
