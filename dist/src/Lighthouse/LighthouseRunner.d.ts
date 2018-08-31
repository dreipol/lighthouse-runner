import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
export default class LighthouseRunner {
    private logger;
    constructor(logger: LoggerInterface);
    runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfigInterface, port: number): Promise<LighthouseReportResult>;
    private launchChromeAndRunLighthouse(url, opts, config, port);
}
