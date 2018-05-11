import PreAuditScript from '../PreAuditScript/PreAuditScript';
import LoggerInterface from '../Logger/LoggerInterface';
import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
export default class ChromeStarter {
    private port;
    private chrome;
    private browser;
    private page;
    private url;
    private logger;
    constructor(url: string, headless: boolean | undefined, port: number, logger: LoggerInterface);
    setup(config: DreihouseConfig): Promise<void>;
    disconnect(): Promise<void>;
    runPreAuditScripts(setupScripts: PreAuditScript[]): Promise<void>;
    private startChrome(chromeFlags);
}
