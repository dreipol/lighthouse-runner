import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
import IReporter from './Report/IReporter';
import ChromeStarter from './ChromeStarter/ChromeStarter';
import IReportResult from "./Interfaces/IReportResult";
export default class Dreihouse {
    protected configFolder: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | IReporter>;
    protected config: DreihouseConfigInterface | null;
    protected logger: LoggerInterface;
    protected reporters: IReporter[];
    protected chromeStarter: ChromeStarter | null;
    constructor(configFile: DreihouseConfigInterface | string | null, reporterNames: Array<string | IReporter>, logger?: LoggerInterface);
    setChromeStarter(value: ChromeStarter): void;
    execute(url: string, port?: number): Promise<IReportResult[] | null>;
    startChrome(url: string): Promise<void>;
    stopChrome(): Promise<void>;
    audit(url: string, port?: number): Promise<IReportResult[] | null>;
    getConfig(): DreihouseConfigInterface | null;
}
