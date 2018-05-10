import LighthouseOptions from "../Interfaces/LighthouseOptions";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
export default class LighthouseRunner {
    private getChromePort(opts, port);
    private launchChromeAndRunLighthouse(_url, opts, config, _port);
    runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: LighthouseConfigInterface, port: Number | null): Promise<LighthouseReportResultInterface>;
}
