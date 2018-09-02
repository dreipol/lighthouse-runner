import {resolve as resolveUrl} from 'url';

import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import LighthouseRunner from '../Lighthouse/LighthouseRunner';
import IReporter from './IReporter';
import IReportResult from "../Interfaces/IReportResult";
import {IDreihouseConfig} from "../Interfaces/IDreihouseConfig";
import {ILogger} from "../Logger/ILogger";
import {IKeyValue} from "../Interfaces/IKeyValue";

/**
 * Runner that generates all the audits
 */
export default class ReportRunner {
    protected config: IDreihouseConfig;
    protected port: number;
    protected opts: ILighthouseOptions;
    protected logger: ILogger;
    protected reporters: IReporter[];
    
    constructor(logger: ILogger, config: IDreihouseConfig, port: number, opts: ILighthouseOptions, reporters: IReporter[]) {
        this.config = config;
        this.port = port;
        this.opts = opts;
        this.logger = logger;
        this.reporters = reporters;
    }
    
    public async createReports(rootUrl: string, paths: string[], allResults: IReportResult[] = []): Promise<IReportResult[]> {
        const urlPath = paths.shift();
        
        if (!urlPath) {
            return allResults;
        }
        
        const results = await this.runReport(rootUrl, urlPath);
        allResults.push(results);
        
        if (paths.length > 0) {
            return this.createReports(rootUrl, paths, allResults);
        }
        
        return allResults;
    }
    
    private async runReporters(site: string, results: IReportResult): Promise<IKeyValue[]> {
        this.logger.info(`Run ${this.reporters.length} reporters`);
        let reporterReturn: IKeyValue[] = [];
        
        for (let i = 0; i < this.reporters.length; i++) {
            const reporter = this.reporters[i];
            if (reporter.setup) {
                this.logger.debug(`${reporter.key} setup`);
                await reporter.setup();
            }
            this.logger.debug(`${reporter.key} process`);
            const reporterData = await reporter.handle(site, results);
            if (reporterData) {
                reporterReturn.push(reporterData);
            }
        }
        
        this.logger.debug(`Running reporters complete`);
        return reporterReturn;
    }
    
    private async runReport(rootUrl: string, path: string): Promise<IReportResult> {
        const site = resolveUrl(rootUrl, path);
        const runner = new LighthouseRunner(this.logger);
        
        this.logger.info(`Create report for ${path}`);
        
        const auditResult = await runner.createAudit(rootUrl, path, this.opts, this.config, this.port);
        
        this.logger.debug(`Report for ${path} completed`);
        
        auditResult.reporters = await this.runReporters(site, auditResult);
        
        return auditResult;
    }
}
