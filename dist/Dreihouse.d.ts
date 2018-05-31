import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import ResultReporterInterface from './ResultReporter/ResultReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import ChromeStarter from './ChromeStarter/ChromeStarter';
export default class Dreihouse {
    protected configFolder: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | ResultReporterInterface>;
    protected config: DreihouseConfigInterface | null;
    protected logger: LoggerInterface;
    protected reporters: ResultReporterInterface[];
    protected chromeStarter: ChromeStarter | null;
    constructor(configFile: DreihouseConfigInterface | string | null, reporterNames: Array<string | ResultReporterInterface>, logger?: LoggerInterface);
    setChromeStarter(value: ChromeStarter): void;
    execute(url: string, port?: number): Promise<LighthouseReportResult[] | null>;
    startChrome(url: string): Promise<void>;
    stopChrome(): Promise<void>;
    audit(url: string, port?: number): Promise<LighthouseReportResult[] | null>;
    getConfig(): DreihouseConfigInterface | null;
}
