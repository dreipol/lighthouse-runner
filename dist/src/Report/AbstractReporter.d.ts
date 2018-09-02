import IReporter from './IReporter';
import IReportResult from "../Interfaces/IReportResult";
import { IDreihouseConfig } from "../Interfaces/IDreihouseConfig";
import { ILogger } from "../Logger/ILogger";
import { IKeyValue } from "../Interfaces/IKeyValue";
export default abstract class AbstractReporter implements IReporter {
    key: string;
    protected config: IDreihouseConfig;
    protected reportFolder: string | null;
    protected logger: ILogger;
    constructor(reportFolder: string | null, config: IDreihouseConfig, logger: ILogger);
    setup(): Promise<void>;
    abstract handle(url: string, results: IReportResult): Promise<IKeyValue | void>;
}
