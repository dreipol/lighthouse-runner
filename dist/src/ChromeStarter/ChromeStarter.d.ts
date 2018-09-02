import { Browser, Page } from 'puppeteer';
import { LaunchedChrome } from 'chrome-launcher';
import { IPreAuditScript } from "../Interfaces/IPreAuditScript";
import { ILogger } from "../Logger/ILogger";
export default class ChromeStarter {
    protected port: number;
    protected chrome: LaunchedChrome | null;
    protected browser: Browser | null;
    protected page: Page | null;
    protected logger: ILogger;
    constructor(headless: boolean | undefined, port: number, logger?: ILogger);
    setup(url: string | null, chromeFlags: string[]): Promise<void>;
    closePage(): Promise<void>;
    disconnect(): Promise<void>;
    runPreAuditScripts(setupScripts: IPreAuditScript[]): Promise<void>;
    protected startChrome(chromeFlags: string[]): Promise<LaunchedChrome>;
}
