import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LoggerInterface from "../Logger/LoggerInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import ResultReporterInterface from "./ResultReporterInterface";

export default abstract class AbstractResultReporter implements ResultReporterInterface {
    protected config: LighthouseConfigInterface;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;

    constructor(reportFolder: string | null, config: LighthouseConfigInterface, logger: LoggerInterface) {
        this.reportFolder = reportFolder;
        this.config = config;
        this.logger = logger;
    }

    public abstract async setup(): Promise<void>;

    public abstract async handle(url: string, results: LighthouseReportResultInterface): Promise<void>
}
