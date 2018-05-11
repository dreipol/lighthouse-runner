import LighthouseOptions from '../Interfaces/LighthouseOptions';
import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import LoggerInterface from '../Logger/LoggerInterface';
export default class LighthouseRunner {
    private logger;
    constructor(logger: LoggerInterface);
    runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfig, port: number): Promise<LighthouseReportResult>;
    private launchChromeAndRunLighthouse(url, opts, config, port);
}
