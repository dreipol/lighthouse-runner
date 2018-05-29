import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import { DreihouseConfig, LoggerInterface } from '@dreipol/lighthouse-config';
export default class ReportRunner {
    protected config: DreihouseConfig;
    protected port: number;
    protected opts: LighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    constructor(logger: LoggerInterface, config: DreihouseConfig, port: number, opts: LighthouseOptions, reporters: ResultReporterInterface[]);
    createReports(rootUrl: string, paths: string[], allResults?: LighthouseReportResult[]): Promise<LighthouseReportResult[]>;
    private runReporters(site, results);
    private runReport(rootUrl, path);
}
