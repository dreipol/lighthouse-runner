import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LoggerInterface from '../Logger/LoggerInterface';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import ResultReporterInterface from './ResultReporterInterface';
export default abstract class AbstractResultReporter implements ResultReporterInterface {
    key: string;
    protected config: DreihouseConfig;
    protected reportFolder: string | null;
    protected logger: LoggerInterface;
    constructor(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface);
    setup(): Promise<void>;
    abstract handle(url: string, results: LighthouseReportResult): Promise<void>;
}
