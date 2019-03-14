import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import IReportResult from "../Interfaces/IReportResult";
import { IDreihouseConfig } from "../Interfaces/IDreihouseConfig";
import { ILogger } from "../Logger/ILogger";
export default class LighthouseRunner {
    private logger;
    constructor(logger: ILogger);
    createAudit(targetUrl: string, urlPath: string, opts: ILighthouseOptions, config: IDreihouseConfig, port: number): Promise<IReportResult>;
    private launchChromeAndRunLighthouse;
}
