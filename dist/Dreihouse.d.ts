import LoggerInterface from './Logger/LoggerInterface';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import { DreihouseConfig } from '@dreipol/lighthouse-config';
export default class Dreihouse {
    protected configFile: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | ResultReporterInterface>;
    protected config: DreihouseConfig | null;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    constructor(configFile: string | undefined, reporterNames: Array<string | ResultReporterInterface>, logger?: LoggerInterface);
    loadConfig(config: DreihouseConfig): void;
    execute(url: string, port?: number): Promise<LighthouseReportResult[] | null>;
}
