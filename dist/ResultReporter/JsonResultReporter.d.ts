import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
import AbstractResultReporter from "./AbstractResultReporter";
import DreihouseConfig from "../Interfaces/Config/DreihouseConfig";
import LoggerInterface from "../Logger/LoggerInterface";
export default class JsonResultReporter extends AbstractResultReporter {
    constructor(reportFolder: string, config: DreihouseConfig, logger: LoggerInterface);
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
