import { Browser, Page } from 'puppeteer';
import { LoggerInterface, PreAuditScriptInterface } from '@dreipol/lighthouse-config';
import { LaunchedChrome } from 'chrome-launcher';
export default class ChromeStarter {
    protected port: number;
    protected chrome: LaunchedChrome | null;
    protected browser: Browser | null;
    protected page: Page | null;
    protected logger: LoggerInterface;
    constructor(headless: boolean | undefined, port: number, logger?: LoggerInterface);
    setup(url: string, chromeFlags: string[]): Promise<void>;
    disconnect(): Promise<void>;
    runPreAuditScripts(setupScripts: PreAuditScriptInterface[]): Promise<void>;
    protected startChrome(chromeFlags: string[]): Promise<LaunchedChrome>;
}
