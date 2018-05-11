import {dirname, resolve} from 'path';
import {existsSync} from 'fs';

import ConfigValidator from './Validator/ConfigValidator';
import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Logger/LoggerInterface';
import ReportRunner from './ReportRunner/ReportRunner';
import DreihouseConfig from './Interfaces/Config/DreihouseConfig';
import LighthouseOptions from './Interfaces/LighthouseOptions';
import ReporterModuleLoader from './ReporterModuleLoader/ReporterModuleLoader';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';

export default class Dreihouse {
    protected configFile: string;
    protected reportFolder: string;
    protected config: DreihouseConfig;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];

    constructor(configFile: string, reporterNames: Array<string | ResultReporterInterface>, logger: LoggerInterface = new NoopPrinter()) {
        this.configFile = configFile;
        this.logger = logger;

        const configFilePath = resolve(process.cwd(), this.configFile);
        if (!existsSync(this.configFile)) {
            throw new Error(`File not found at ${this.configFile}`);
        }

        this.logger.print(`Validating ${configFilePath}`);
        this.config = ConfigValidator.validate(require(configFilePath));
        this.logger.print(`Config seems valid`);
        this.reportFolder = resolve(dirname(this.configFile), this.config.folder);
        this.logger.print(`Load modules for reporters ${reporterNames.join(',')}`);
        this.reporters = ReporterModuleLoader.load(this.reportFolder, this.config, this.logger, reporterNames);
        this.logger.print(`Reporer modules loaded`);
    }

    public async execute(port: number | null): Promise<LighthouseReportResult[] | null> {
        const {paths, chromeFlags, disableEmulation, disableThrottling} = this.config;
        const opts: LighthouseOptions = {
            chromeFlags,
        };

        opts.disableDeviceEmulation = disableEmulation;
        opts.disableNetworkThrottling = disableThrottling;
        opts.disableCpuThrottling = disableThrottling;

        let reportPaths: string[] = paths;

        if (!Array.isArray(paths)) {
            reportPaths = [paths];
        }

        this.logger.print(`Report runner created`);
        const runner = new ReportRunner(this.logger, this.config, port, opts, this.reporters);
        this.logger.print(`Start creating reports for ${this.config.url} paths [${reportPaths.join(',')}]`);
        return await runner.createReports(reportPaths);
    }
}
