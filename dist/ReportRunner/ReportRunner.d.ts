import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseOptions from "../Interfaces/LighthouseOptions";
import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";
import LoggerInterface from "../Logger/LoggerInterface";
export default class ReportRunner {
    config: LighthouseConfigInterface;
    port: Number | null;
    opts: LighthouseOptions;
    logger: LoggerInterface;
    reporters: ResultReporterInterface[];
    constructor(logger: LoggerInterface, config: LighthouseConfigInterface, port: Number | null, opts: LighthouseOptions, reporters: ResultReporterInterface[]);
    private printResults(categories, budget);
    private runPersisters(site, results);
    private runReport(path);
    createReports(paths: Array<string>, allResults?: Array<Object>): Promise<any>;
}
