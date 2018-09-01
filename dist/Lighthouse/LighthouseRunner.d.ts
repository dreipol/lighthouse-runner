import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import IReportResult from "../Interfaces/IReportResult";
export default class LighthouseRunner {
    private logger;
    constructor(logger: LoggerInterface);
    createAudit(targetUrl: string, urlPath: string, opts: ILighthouseOptions, config: DreihouseConfigInterface, port: number): Promise<IReportResult>;
    private launchChromeAndRunLighthouse;
}
