import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LoggerInterface from '../Logger/LoggerInterface';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import { DreihouseConfig } from '@dreipol/lighthouse-config';
export default class LighthouseRunner {
    private logger;
    constructor(logger: LoggerInterface);
    runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfig, port: number): Promise<LighthouseReportResult>;
    private launchChromeAndRunLighthouse(url, opts, config, port);
}
