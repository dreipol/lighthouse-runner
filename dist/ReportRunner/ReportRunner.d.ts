import RunnerMeta from "../Interfaces/RunnerMeta";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseOptions from "../Interfaces/LighthouseOptions";
import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";
export default class ReportRunner {
    config: LighthouseConfigInterface;
    port: Number | null;
    opts: LighthouseOptions;
    meta: RunnerMeta;
    persisters: ResultReporterInterface[];
    constructor(config: LighthouseConfigInterface, port: Number | null, opts: LighthouseOptions, meta: RunnerMeta, persisters: ResultReporterInterface[]);
    private printResults(categories, budget);
    private runPersisters(site, results);
    private runReport(path);
    createReports(paths: Array<string>, allResults?: Array<Object>): Promise<any>;
}
