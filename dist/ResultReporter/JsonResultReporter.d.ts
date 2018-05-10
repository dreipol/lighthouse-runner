import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import AbstractResultReporter from "./AbstractResultReporter";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LoggerInterface from "../Logger/LoggerInterface";
export default class JsonResultReporter extends AbstractResultReporter {
    constructor(reportFolder: string, config: LighthouseConfigInterface, logger: LoggerInterface);
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResultInterface): Promise<void>;
}
