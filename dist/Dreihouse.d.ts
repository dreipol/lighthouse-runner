import LoggerInterface from './Logger/LoggerInterface';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import { DreihouseConfig } from '@dreipol/lighthouse-config';
export default class Dreihouse {
    protected configFile: string;
    protected suppressOutput: boolean;
    protected reportFolder: string;
    protected reporterNames: Array<string | ResultReporterInterface>;
    protected config: DreihouseConfig | null;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    protected spinner: any | null;
    constructor(configFile: string | undefined, reporterNames: Array<string | ResultReporterInterface>, logger?: LoggerInterface, suppressOutput?: boolean);
    loadConfig(config: DreihouseConfig): void;
    execute(url: string, port?: number): Promise<LighthouseReportResult[] | null>;
}
