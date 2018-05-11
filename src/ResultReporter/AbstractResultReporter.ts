import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LoggerInterface from '../Logger/LoggerInterface';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ResultReporterInterface from './ResultReporterInterface';

export default abstract class AbstractResultReporter implements ResultReporterInterface {
    public key = 'AbstractResultReporter';
    protected config: DreihouseConfig;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;

    constructor(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface) {
        this.reportFolder = reportFolder;
        this.config = config;
        this.logger = logger;
    }

    public async setup(): Promise<void> {
        return;
    }

    public abstract async handle(url: string, results: LighthouseReportResult): Promise<void>;
}
