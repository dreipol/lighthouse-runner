import {resolve as resolveUrl} from 'url';

import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import LighthouseRunner from '../Lighthouse/LighthouseRunner';
import ReporterInterface from './ReporterInterface';
import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';

export default class ReportRunner {
    protected config: DreihouseConfigInterface;
    protected port: number;
    protected opts: LighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: ReporterInterface[];

    constructor(logger: LoggerInterface, config: DreihouseConfigInterface, port: number, opts: LighthouseOptions, reporters: ReporterInterface[]) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }

    public async createReports(rootUrl: string, paths: string[], allResults: LighthouseReportResult[] = []): Promise<LighthouseReportResult[]> {
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

    private async runReporters(site: string, results: LighthouseReportResult): Promise<void> {
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

    private async runReport(rootUrl: string, path: string): Promise<LighthouseReportResult> {
        const site = resolveUrl(rootUrl, path);

        const runner = new LighthouseRunner(this.logger);
        this.logger.info(`Create report for ${path}`);
        const results = await runner.runReport(rootUrl, path, this.opts, this.config, this.port);
        this.logger.debug(`Report for ${path} completed`);
        await this.runReporters(site, results);
        return results;
    }
}
