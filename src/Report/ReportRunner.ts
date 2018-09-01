import {resolve as resolveUrl} from 'url';

import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import LighthouseRunner from '../Lighthouse/LighthouseRunner';
import IReporter from './IReporter';
import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';
import IReportResult from "../Interfaces/IReportResult";

export default class ReportRunner {
    protected config: DreihouseConfigInterface;
    protected port: number;
    protected opts: ILighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: IReporter[];

    constructor(logger: LoggerInterface, config: DreihouseConfigInterface, port: number, opts: ILighthouseOptions, reporters: IReporter[]) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }

    public async createReports(rootUrl: string, paths: string[], allResults: IReportResult[] = []): Promise<IReportResult[]> {
        const urlPath = paths.shift();

        if (!urlPath) {
            return allResults;
        }

        const results = await this.runReport(rootUrl, urlPath);
        allResults.push(results);

        if (paths.length > 0) {
            return this.createReports(rootUrl, paths, allResults);
        }

        return allResults;
    }

    private async runReporters(site: string, results: IReportResult): Promise<void> {
        this.logger.info(`Run ${this.reporters.length} reporters`);

        for (let i = 0; i < this.reporters.length; i++) {
            const reporter = this.reporters[i];
            if (reporter.setup) {
                this.logger.debug(`${reporter.key} setup`);
                await reporter.setup();
            }
            this.logger.debug(`${reporter.key} process`);
            await reporter.handle(site, results);
        }

        this.logger.debug(`Running reporters complete`);
    }

    private async runReport(rootUrl: string, path: string): Promise<IReportResult> {
        const site = resolveUrl(rootUrl, path);

        const runner = new LighthouseRunner(this.logger);
        this.logger.info(`Create report for ${path}`);
        const results = await runner.createAudit(rootUrl, path, this.opts, this.config, this.port);
        this.logger.debug(`Report for ${path} completed`);
        await this.runReporters(site, results);
        return results;
    }
}
