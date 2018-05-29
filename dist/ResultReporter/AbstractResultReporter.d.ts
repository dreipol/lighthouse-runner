import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ResultReporterInterface from './ResultReporterInterface';
import { DreihouseConfig, LoggerInterface } from '@dreipol/lighthouse-config';
export default abstract class AbstractResultReporter implements ResultReporterInterface {
    key: string;
    protected config: DreihouseConfig;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;
    constructor(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface);
    setup(): Promise<void>;
    abstract handle(url: string, results: LighthouseReportResult): Promise<void>;
}
