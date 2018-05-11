import LoggerInterface from './Logger/LoggerInterface';
import DreihouseConfig from './Interfaces/Config/DreihouseConfig';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
export default class Dreihouse {
    protected configFile: string;
    protected reportFolder: string;
    protected config: DreihouseConfig;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    constructor(configFile: string, reporterNames: Array<string | ResultReporterInterface>, logger?: LoggerInterface);
    execute(port: number | null): Promise<LighthouseReportResult[] | null>;
}
