import PreAuditScript from '../PreAuditScript/PreAuditScript';
import LoggerInterface from '../Logger/LoggerInterface';
export default class ChromeStarter {
    private port;
    private headless;
    private chrome;
    private browser;
    private page;
    private url;
    private logger;
    constructor(url: string, headless: boolean | undefined, port: number, logger: LoggerInterface);
    setup(setupScripts: PreAuditScript[]): Promise<void>;
    disconnect(): Promise<void>;
    private runPreAuditScripts(page, setupScripts);
    private startChrome(headless);
}
