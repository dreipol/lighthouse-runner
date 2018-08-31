import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';

import NoopPrinter from './Logger/NoopLogger';
import ReportRunner from './Report/ReportRunner';
import LighthouseOptions from './Interfaces/LighthouseOptions';
import ReporterInterface from './Report/ReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import ChromeStarter from './ChromeStarter/ChromeStarter';
import ConfigLoader from './ConfigLoader/ConfigLoader';
import ReporterLoader from './Report/ReporterLoader';

const {version} = require('../package.json');

export default class Dreihouse {
    protected configFolder: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | ReporterInterface>;
    protected config: DreihouseConfigInterface | null;
    protected logger: LoggerInterface;
    protected reporters: ReporterInterface[];
    protected chromeStarter: ChromeStarter | null;

    constructor(configFile: DreihouseConfigInterface | string | null,
                reporterNames: Array<string | ReporterInterface>,
                logger: LoggerInterface = new NoopPrinter()) {
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.config = null;
        this.chromeStarter = null;
        this.configFolder = process.cwd();

        this.logger.info(`Dreihouse v${version}`);
        const configLoader = new ConfigLoader();

        this.config = configLoader.load(this, configFile);
        this.reportFolder = this.config.folder;

        this.reporters = ReporterLoader.load(this.reportFolder, this.config, this.logger, this.reporterNames);
        this.setChromeStarter(new ChromeStarter(true, 9222, this.logger));
    }

    public setChromeStarter(value: ChromeStarter): void {
        this.chromeStarter = value;
        this.logger.debug('Set chromestarter');
    }

    public async execute(url: string, port: number = 9222): Promise<LighthouseReportResult[] | null> {
        if (!this.config) {
            throw new Error('No config loaded');
        }

        await this.startChrome(url);
        let auditResults = null;

        try {
            auditResults = await this.audit(url, port);
        } catch (e) {
            this.logger.error(e.message);
            await this.stopChrome();
            throw e;
        }

        await this.stopChrome();
        return auditResults;
    }

    public async startChrome(url: string) {
        if (!this.config) {
            throw new Error('No config available');
        }

        if (!this.chromeStarter) {
            throw new Error('No chrome starter defined');
        }

        await this.chromeStarter.setup(url, this.config.chromeFlags);

        if (this.config.preAuditScripts) {
            await this.chromeStarter.runPreAuditScripts(this.config.preAuditScripts);
        }
        await this.chromeStarter.closePage();
    }

    public async stopChrome() {
        if (!this.chromeStarter) {
            throw new Error('Chrome not started');
        }

        this.logger.debug(`Stopping chrome`);

        await this.chromeStarter.disconnect();
    }

    public async audit(url: string, port: number = 9222): Promise<LighthouseReportResult[] | null> {

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
        const runner = new ReportRunner(this.logger, this.config, port, opts, this.reporters);

        this.logger.info(`Start creating reports for ${url} paths [${reportPaths.join(',')}]`);
        return await runner.createReports(url, reportPaths);
    }

    public getConfig(): DreihouseConfigInterface | null {
        return this.config;
    }
}
