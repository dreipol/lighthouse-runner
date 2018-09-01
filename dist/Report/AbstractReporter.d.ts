import IReporter from './IReporter';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import IReportResult from "../Interfaces/IReportResult";
export default abstract class AbstractReporter implements IReporter {
    key: string;
    protected config: DreihouseConfigInterface;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;
    constructor(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface);
    setup(): Promise<void>;
    abstract handle(url: string, results: IReportResult): Promise<void>;
}
