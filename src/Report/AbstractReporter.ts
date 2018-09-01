import IReporter from './IReporter';
import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';
import IReportResult from "../Interfaces/IReportResult";

export default abstract class AbstractReporter implements IReporter {
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

    public abstract async handle(url: string, results: IReportResult): Promise<void>;
}
