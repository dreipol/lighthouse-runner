import IReporter from './IReporter';
import IReportResult from "../Interfaces/IReportResult";
import {IDreihouseConfig} from "../Interfaces/IDreihouseConfig";
import {ILogger} from "../Logger/ILogger";
import {IKeyValue} from "../Interfaces/IKeyValue";

export default abstract class AbstractReporter implements IReporter {
    public key = 'AbstractResultReporter';
    protected config: IDreihouseConfig;
    protected reportFolder: string | null;
    protected logger: ILogger;
    
    constructor(reportFolder: string | null, config: IDreihouseConfig, logger: ILogger) {
        this.reportFolder = reportFolder;
        this.config = config;
        this.logger = logger;
    }
    
    public async setup(): Promise<void> {
        return;
    }
    
    public abstract async handle(url: string, results: IReportResult): Promise<IKeyValue | void>;
}
