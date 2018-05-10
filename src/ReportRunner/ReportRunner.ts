import DreihouseConfig from "../Interfaces/Config/DreihouseConfig";
import LighthouseOptions from "../Interfaces/LighthouseOptions";
import {resolve as resolveUrl} from "url";
import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
import LighthouseRunner from "../LighthouseRunner/LighthouseRunner";
import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";
import LoggerInterface from "../Logger/LoggerInterface";

export default class ReportRunner {
    config: DreihouseConfig;
    port: Number | null;
    opts: LighthouseOptions;
    logger: LoggerInterface;
    reporters: ResultReporterInterface[];

    constructor(logger: LoggerInterface, config: DreihouseConfig, port: Number | null, opts: LighthouseOptions, reporters: ResultReporterInterface[]) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }

    private async runPersisters(site: string, results: LighthouseReportResult): Promise<void> {
        this.reporters.forEach(async(persister) => {
            await persister.setup();
            await persister.handle(site, results);
        });
    }

    private async runReport(path: string): Promise<LighthouseReportResult> {
        const {url, report} = this.config;
        const site = resolveUrl(url, path);
        const runner = new LighthouseRunner();
        const results = await runner.runReport(url, path, this.opts, report, this.port);
        await this.runPersisters(site, results);
        return results;
    }

    public async createReports(paths: Array<string>, allResults: Array<Object> = []): Promise<any> {
        const urlPath = paths.shift();

        if (!urlPath) {
            return Promise.resolve();
        }

        const results = await this.runReport(urlPath);
        allResults.push(results);

        if (paths.length > 0) {
            return this.createReports(paths, allResults);
        }

        return allResults;
    }
}
