import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import ReporterInterface from './Report/ReporterInterface';
import LighthouseReportResult from './Interfaces/LighthouseReportResult';
import ChromeStarter from './ChromeStarter/ChromeStarter';
export default class Dreihouse {
    protected configFolder: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | ReporterInterface>;
    protected config: DreihouseConfigInterface | null;
    protected logger: LoggerInterface;
    protected reporters: ReporterInterface[];
    protected chromeStarter: ChromeStarter | null;
    constructor(configFile: DreihouseConfigInterface | string | null, reporterNames: Array<string | ReporterInterface>, logger?: LoggerInterface);
    setChromeStarter(value: ChromeStarter): void;
    execute(url: string, port?: number): Promise<LighthouseReportResult[] | null>;
    startChrome(url: string): Promise<void>;
    stopChrome(): Promise<void>;
    audit(url: string, port?: number): Promise<LighthouseReportResult[] | null>;
    getConfig(): DreihouseConfigInterface | null;
}
