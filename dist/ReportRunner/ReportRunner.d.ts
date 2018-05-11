import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import LoggerInterface from '../Logger/LoggerInterface';
export default class ReportRunner {
    protected config: DreihouseConfig;
    protected port: number | null;
    protected opts: LighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    constructor(logger: LoggerInterface, config: DreihouseConfig, port: number | null, opts: LighthouseOptions, reporters: ResultReporterInterface[]);
    createReports(paths: string[], allResults?: LighthouseReportResult[]): Promise<LighthouseReportResult[]>;
    private runReporters(site, results);
    private runReport(path);
}
