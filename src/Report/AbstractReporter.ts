import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ReporterInterface from './ReporterInterface';
import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';

export default abstract class AbstractReporter implements ReporterInterface {
    public key = 'AbstractResultReporter';
    protected config: DreihouseConfigInterface;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;

    constructor(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface) {
        this.reportFolder = reportFolder;
        this.config = config;
        this.logger = logger;
    }

    public async setup(): Promise<void> {
        return;
    }

    public abstract async handle(url: string, results: LighthouseReportResult): Promise<void>;
}
