import LoggerInterface from '../Logger/LoggerInterface';
import { PreAuditScriptInterface } from '@dreipol/lighthouse-config';
export default class ChromeStarter {
    private port;
    private chrome;
    private browser;
    private page;
    private url;
    private logger;
    constructor(initialUrl: string, headless: boolean | undefined, port: number, logger?: LoggerInterface);
    setup(chromeFlags: string[]): Promise<void>;
    disconnect(): Promise<void>;
    runPreAuditScripts(setupScripts: PreAuditScriptInterface[]): Promise<void>;
    private startChrome(chromeFlags);
}
