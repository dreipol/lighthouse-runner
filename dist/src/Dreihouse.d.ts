import IReporter from './Report/IReporter';
import ChromeStarter from './ChromeStarter/ChromeStarter';
import IReportResult from './Interfaces/IReportResult';
import { IDreihouseConfig } from './Interfaces/IDreihouseConfig';
import { ILogger } from './Logger/ILogger';
export default class Dreihouse {
    protected configFolder: string;
    protected reportFolder: string;
    protected reporterNames: Array<string | IReporter>;
    protected config: IDreihouseConfig | null;
    protected logger: ILogger;
    protected reporters: IReporter[];
    protected chromeStarter: ChromeStarter | null;
    constructor(configFile: IDreihouseConfig | string | null, reporterNames: Array<string | IReporter>, logger?: ILogger);
    setChromeStarter(value: ChromeStarter): void;
    execute(url: string, port?: number): Promise<IReportResult[] | null>;
    startChrome(url: string): Promise<void>;
    stopChrome(): Promise<void>;
    audit(url: string, port?: number): Promise<IReportResult[] | null>;
    getConfig(): IDreihouseConfig | null;
}
