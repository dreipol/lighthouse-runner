import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import IReporter from './IReporter';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import IReportResult from "../Interfaces/IReportResult";
export default class ReportRunner {
    protected config: DreihouseConfigInterface;
    protected port: number;
    protected opts: ILighthouseOptions;
    protected logger: LoggerInterface;
    protected reporters: IReporter[];
    constructor(logger: LoggerInterface, config: DreihouseConfigInterface, port: number, opts: ILighthouseOptions, reporters: IReporter[]);
    createReports(rootUrl: string, paths: string[], allResults?: IReportResult[]): Promise<IReportResult[]>;
    private runReporters;
    private runReport;
}
