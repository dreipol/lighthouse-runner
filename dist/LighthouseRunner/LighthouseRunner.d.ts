import LighthouseOptions from '../Interfaces/LighthouseOptions';
import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
export default class LighthouseRunner {
    runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfig, port: number | null): Promise<LighthouseReportResult>;
    private launchChromeAndRunLighthouse(url, opts, config, port);
}
