import LoggerInterface from './Logger/LoggerInterface';
import DreihouseConfig from './Interfaces/Config/DreihouseConfig';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
export default class Dreihouse {
    protected configFile: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | ResultReporterInterface>;
    protected config: DreihouseConfig | null;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    constructor(configFile: string, reporterNames: Array<string | ResultReporterInterface>, logger?: LoggerInterface);
    loadConfig(config: DreihouseConfig): void;
    execute(port?: number): Promise<LighthouseReportResult[] | null>;
}
