import {dirname, resolve} from 'path';
import {existsSync} from 'fs';

import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Logger/LoggerInterface';
import ReportRunner from './ReportRunner/ReportRunner';
import LighthouseOptions from './Interfaces/LighthouseOptions';
import ReporterModuleLoader from './ReporterModuleLoader/ReporterModuleLoader';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import {ConfigValidator, DreihouseConfig} from '@dreipol/lighthouse-config';

export default class Dreihouse {
    protected configFile: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | ResultReporterInterface>;
    protected config: DreihouseConfig | null;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];

    constructor(configFile: string, reporterNames: Array<string | ResultReporterInterface>, logger: LoggerInterface = new NoopPrinter()) {
        this.configFile = configFile;
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.reportFolder = '';
        this.config = null;

        const configFilePath = resolve(process.cwd(), this.configFile);
        if (!existsSync(this.configFile)) {
            throw new Error(`File not found at ${this.configFile}`);
        }

        this.loadConfig(require(configFilePath));
    }

    public loadConfig(config: DreihouseConfig): void {
        this.logger.print(`Validating config`);
        this.config = ConfigValidator.validate(config);
        this.logger.print(`Config seems valid`);

        this.reportFolder = resolve(dirname(this.configFile), config.folder);

        if (!this.reporterNames) {
            throw new Error('Reporters are required');
        }
        this.logger.print(`Load modules for reporters ${this.reporterNames.join(',')}`);

        if (!this.config) {
            throw new Error('No config loaded');
        }

        this.reporters = ReporterModuleLoader.load(this.reportFolder, this.config, this.logger, this.reporterNames);
        this.logger.print(`${this.reporters.length} reporter modules loaded`);
    }

    public async execute(port: number = 9222): Promise<LighthouseReportResult[] | null> {
        if (!this.config) {
            throw new Error('No config loaded');
        }

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
