import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ReporterInterface from './ReporterInterface';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
export default class ReportRunner {
    protected config: DreihouseConfigInterface;
    protected port: number;
    protected opts: LighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: ReporterInterface[];
    constructor(logger: LoggerInterface, config: DreihouseConfigInterface, port: number, opts: LighthouseOptions, reporters: ReporterInterface[]);
    createReports(rootUrl: string, paths: string[], allResults?: LighthouseReportResult[]): Promise<LighthouseReportResult[]>;
    private runReporters;
    private runReport;
}
