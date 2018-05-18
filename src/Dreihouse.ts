import {dirname, isAbsolute, resolve} from 'path';
import {existsSync} from 'fs';
import ora from 'ora';
import {ConfigValidator, DreihouseConfig} from '@dreipol/lighthouse-config';

import NoopPrinter from './Logger/NoopLogger';
import LoggerInterface from './Logger/LoggerInterface';
import ReportRunner from './ReportRunner/ReportRunner';
import LighthouseOptions from './Interfaces/LighthouseOptions';
import ReporterModuleLoader from './ReporterModuleLoader/ReporterModuleLoader';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import ChromeStarter from './ChromeStarter/ChromeStarter';

export default class Dreihouse {
    protected configFolder: string;
    protected suppressOutput: boolean;
    protected reportFolder: string;
    protected reporterNames: Array<string | ResultReporterInterface>;
    protected config: DreihouseConfig | null;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    protected spinner: any | null;
    protected chromeStarter: ChromeStarter | null;

    constructor(configFile: DreihouseConfig | string | null, reporterNames: Array<string | ResultReporterInterface>, logger: LoggerInterface = new NoopPrinter(), suppressOutput: boolean = false) {
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.reportFolder = '';
        this.config = null;
        this.chromeStarter = null;
        this.suppressOutput = suppressOutput;
        this.configFolder = process.cwd();

        if (!this.suppressOutput) {
            this.spinner = ora(`Generating report`);
        }

        if (typeof configFile === 'object' && configFile !== null) {
            this.loadConfig((<DreihouseConfig> configFile), process.cwd());
            return;
        }

        if (configFile === null) {
            this.loadConfig(require('../config/base.js'), process.cwd());
            return;
        }

        this.loadConfigFile(configFile);
    }

    public loadConfigFile(configFile: string): void {
        let resolveFolder = process.cwd();

        if (isAbsolute(configFile)) {
            resolveFolder = dirname(configFile);
        }

        if (!existsSync(configFile)) {
            throw new Error(`File not found at ${configFile}`);
        }

        this.loadConfig(require(resolve(resolveFolder, configFile)), resolveFolder);
    }

    public loadConfig(config: DreihouseConfig, resolveFolder: string): void {
        if (this.spinner) {
            this.spinner.start();
        }
        this.logger.print(`Validating config`);
        this.config = ConfigValidator.validate(config);
        this.logger.print(`Config seems valid`);

        this.reportFolder = resolve(resolveFolder, config.folder);

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

    public setChromeStarter(value: ChromeStarter) {
        this.chromeStarter = value;
        this.logger.print('Overwrite default chromestarter');
    }

    public async execute(url: string, port: number = 9222): Promise<LighthouseReportResult[] | null> {
        if (!this.config) {
            throw new Error('No config loaded');
        }

        await this.startChrome(url);
        const auditResults = await this.audit(url, port);
        await this.stopChrome();
        return auditResults;
    }

    public async startChrome(url: string) {
        if (!this.config) {
            throw new Error('No config available');
        }

        if (!this.chromeStarter) {
            this.chromeStarter = new ChromeStarter(url, true, 9222, this.logger);
        }

        await this.chromeStarter.setup(this.config.chromeFlags);

        if (this.config.preAuditScripts) {
            await this.chromeStarter.runPreAuditScripts(this.config.preAuditScripts);
        }
    }

    public async stopChrome() {
        if (!this.chromeStarter) {
            throw new Error('Chrome not started');
        }

        await this.chromeStarter.disconnect();
    }

    public async audit(url: string, port: number = 9222): Promise<LighthouseReportResult[] | null> {
        this.logger.print('Start audit');
        if (this.spinner) {
            this.spinner.start();
        }
        if (!this.config) {
            throw new Error('No config loaded');
        }
        const {paths, disableEmulation, disableThrottling} = this.config;

        const opts: LighthouseOptions = {};

        opts.disableDeviceEmulation = disableEmulation;
        opts.disableNetworkThrottling = disableThrottling;
        opts.disableCpuThrottling = disableThrottling;

        let auditPaths = paths;

        if (!Array.isArray(paths)) {
            auditPaths = [paths];
        }

        const reportPaths: string[] = [...auditPaths];

        this.logger.print(`Report runner created`);
        const runner = new ReportRunner(this.logger, this.config, port, opts, this.reporters);

        this.logger.print(`Start creating reports for ${url} paths [${reportPaths.join(',')}]`);
        const reports = await runner.createReports(url, reportPaths);
        if (this.spinner) {
            this.spinner.stop();
        }
        return reports;
    }

}
