import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
export default class ReportRunner {
    protected config: DreihouseConfigInterface;
    protected port: number;
    protected opts: LighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    constructor(logger: LoggerInterface, config: DreihouseConfigInterface, port: number, opts: LighthouseOptions, reporters: ResultReporterInterface[]);
    createReports(rootUrl: string, paths: string[], allResults?: LighthouseReportResult[]): Promise<LighthouseReportResult[]>;
    private runReporters(site, results);
    private runReport(rootUrl, path);
}
