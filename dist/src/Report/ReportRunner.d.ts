import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import IReporter from './IReporter';
import IReportResult from "../Interfaces/IReportResult";
import { IDreihouseConfig } from "../Interfaces/IDreihouseConfig";
import { ILogger } from "../Logger/ILogger";
export default class ReportRunner {
    protected config: IDreihouseConfig;
    protected port: number;
    protected opts: ILighthouseOptions;
    protected logger: ILogger;
    protected reporters: IReporter[];
    constructor(logger: ILogger, config: IDreihouseConfig, port: number, opts: ILighthouseOptions, reporters: IReporter[]);
    createReports(rootUrl: string, paths: string[], allResults?: IReportResult[]): Promise<IReportResult[]>;
    private runReporters(site, results);
    private runReport(rootUrl, path);
}
