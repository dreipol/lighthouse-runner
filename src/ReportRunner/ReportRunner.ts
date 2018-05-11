import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LighthouseOptions from '../Interfaces/LighthouseOptions';
import {resolve as resolveUrl} from 'url';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import LighthouseRunner from '../LighthouseRunner/LighthouseRunner';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import LoggerInterface from '../Logger/LoggerInterface';

export default class ReportRunner {
    protected config: DreihouseConfig;
    protected port: number | null;
    protected opts: LighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];

    constructor(logger: LoggerInterface, config: DreihouseConfig, port: number | null, opts: LighthouseOptions, reporters: ResultReporterInterface[]) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }

    public async createReports(paths: string[], allResults: LighthouseReportResult[] = []): Promise<LighthouseReportResult[]> {
        const urlPath = paths.shift();

        if (!urlPath) {
            return allResults;
        }

        const results = await this.runReport(urlPath);
        allResults.push(results);

        if (paths.length > 0) {
            return this.createReports(paths, allResults);
        }

        return allResults;
    }

    private async runReporters(site: string, results: LighthouseReportResult): Promise<void> {
        this.logger.print(`Run ${this.reporters.length} reporters`);
        this.reporters.forEach(async (reporter) => {
            if (reporter.setup) {
                this.logger.print(`${reporter.key} setup`);
                await reporter.setup();
            }
            this.logger.print(`${reporter.key} process`);
            await reporter.handle(site, results);
        });
        this.logger.print(`Running reporters complete`);
    }

    private async runReport(path: string): Promise<LighthouseReportResult> {
        const {url, report} = this.config;
        const site = resolveUrl(url, path);

        const runner = new LighthouseRunner();
        this.logger.print(`Create report for ${path}`);
        const results = await runner.runReport(url, path, this.opts, report, this.port);
        this.logger.print(`Report for ${path} completed`);
        await this.runReporters(site, results);
        return results;
    }
}
