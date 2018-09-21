import {resolve} from 'url';

import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import {ILighthouseResult} from '../Interfaces/ILighthouseResult';
import RunnerResultTransformer from "../Transformer/RunnerResultTransformer";
import IReportResult from "../Interfaces/IReportResult";
import {IDreihouseConfig} from "../Interfaces/IDreihouseConfig";
import {ILogger} from "../Logger/ILogger";

const lighthouse = require('lighthouse');

/**
 * Generates a lighthouse lighthouse
 */
export default class LighthouseRunner {
    private logger: ILogger;
    
    constructor(logger: ILogger) {
        this.logger = logger;
    }
    
    public async createAudit(targetUrl: string, urlPath: string, opts: ILighthouseOptions, config: IDreihouseConfig, port: number): Promise<IReportResult> {
        const url = resolve(targetUrl, urlPath);
        const auditResult = await this.launchChromeAndRunLighthouse(url, opts, config, port);
        return RunnerResultTransformer.transform(auditResult);
    }
    
    private async launchChromeAndRunLighthouse(url: string, opts: ILighthouseOptions, config: IDreihouseConfig, port: number): Promise<ILighthouseResult> {
        let results: ILighthouseResult;
        
        try {
            if (port) {
                opts.port = port;
            }
            
            opts.disableStorageReset = true;
            this.logger.debug('Start lighthouse audit');
            
            results = await lighthouse(url, opts, config.lighthouse);
            
            this.logger.debug('Lighthouse audit complete');
            
        } catch (e) {
            throw e;
        }
        
        return results;
    }
}
