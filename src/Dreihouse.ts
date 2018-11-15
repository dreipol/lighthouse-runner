import NoopPrinter from './Logger/NoopLogger';
import ReportRunner from './Report/ReportRunner';
import ILighthouseOptions from './Interfaces/ILighthouseOptions';
import IReporter from './Report/IReporter';
import ChromeStarter from './ChromeStarter/ChromeStarter';
import ConfigLoader from './Config/ConfigLoader';
import ReporterLoader from './Report/ReporterLoader';
import IReportResult from './Interfaces/IReportResult';
import { IDreihouseConfig } from './Interfaces/IDreihouseConfig';
import { ILogger } from './Logger/ILogger';

const { version } = require('../package.json');

/**
 * Main entrypoint
 */
export default class Dreihouse {
    protected configFolder: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | IReporter>;
    protected config: IDreihouseConfig | null;
    protected logger: ILogger;
    protected reporters: IReporter[];
    protected chromeStarter: ChromeStarter | null;

    constructor(configFile: IDreihouseConfig | string | null, reporterNames: Array<string | IReporter>, logger: ILogger = new NoopPrinter()) {
        this.logger = logger;
        this.reporterNames = reporterNames;
        this.reporters = [];
        this.config = null;
        this.chromeStarter = null;
        this.configFolder = process.cwd();

        this.logger.info(`Dreihouse v${version}`);

        try {
            this.config = ConfigLoader.load(configFile);
            this.reportFolder = this.config.folder;
            this.logger.info(`Config successfully loaded`);
        } catch (e) {
            this.logger.error(`Failed loading configuration`);
            throw e;
        }

        this.reporters = ReporterLoader.load(this.reportFolder, this.config, this.logger, this.reporterNames);
        this.setChromeStarter(new ChromeStarter(true, 9222, this.logger));
    }

    /**
     * Set custom chromestarter
     * @param value
     */
    public setChromeStarter(value: ChromeStarter): void {
        this.logger.debug('Set chromestarter');
        this.chromeStarter = value;
    }

    /**
     * Run report
     * @param url
     * @param port
     */
    public async execute(url: string, port: number = 9222): Promise<IReportResult[] | null> {
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

    /**
     * Start chrome
     * @param url
     */
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

    /**
     * Stop chrome
     */
    public async stopChrome() {
        if (this.chromeStarter) {
            this.logger.debug(`Stopping chrome`);

            await this.chromeStarter.disconnect();
        }
    }

    /**
     * Crate audit
     * @param url
     * @param port
     */
    public async audit(url: string, port: number = 9222): Promise<IReportResult[] | null> {

        if (!this.config) {
            throw new Error('No config loaded');
        }
        const { paths, disableEmulation, disableThrottling } = this.config;

        const opts: ILighthouseOptions = {};

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

    /**
     * Get the current config
     */
    public getConfig(): IDreihouseConfig | null {
        return this.config;
    }
}
