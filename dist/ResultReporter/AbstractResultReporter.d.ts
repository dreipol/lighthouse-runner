import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LoggerInterface from "../Interfaces/LoggerInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import ResultReporterInterface from "./ResultReporterInterface";
export default abstract class AbstractResultReporter implements ResultReporterInterface {
    protected config: LighthouseConfigInterface;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;
    constructor(reportFolder: string | null, config: LighthouseConfigInterface, logger: LoggerInterface);
    abstract setup(): Promise<void>;
    abstract handle(url: string, results: LighthouseReportResultInterface): Promise<void>;
}
