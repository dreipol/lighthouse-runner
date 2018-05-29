import { LoggerInterface, PreAuditScriptInterface } from '@dreipol/lighthouse-config';
export default class ChromeStarter {
    private port;
    private chrome;
    private browser;
    private page;
    private logger;
    constructor(headless: boolean | undefined, port: number, logger?: LoggerInterface);
    setup(url: string, chromeFlags: string[]): Promise<void>;
    disconnect(): Promise<void>;
    runPreAuditScripts(setupScripts: PreAuditScriptInterface[]): Promise<void>;
    private startChrome(chromeFlags);
}
