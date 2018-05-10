import LighthouseOptions from "../Interfaces/LighthouseOptions";
import DreihouseConfig from "../Interfaces/Config/DreihouseConfig";
import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
export default class LighthouseRunner {
    private getChromePort(opts, port);
    private launchChromeAndRunLighthouse(_url, opts, config, _port);
    runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfig, port: Number | null): Promise<LighthouseReportResult>;
}
