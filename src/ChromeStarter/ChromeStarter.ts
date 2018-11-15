import { Browser, connect, Page } from 'puppeteer';
import * as chromeLauncher from 'chrome-launcher';
import { LaunchedChrome } from 'chrome-launcher';
import NoopLogger from '../Logger/NoopLogger';
import { IPreAuditScript } from "../Interfaces/IPreAuditScript";
import { ILogger } from "../Logger/ILogger";

const request = require('request');
const util = require('util');

/**
 * Starts a chrome instance, makes the first page load and runs pre launching scripts
 */
export default class ChromeStarter {
    protected port: number;
    protected chrome: LaunchedChrome | null;
    protected browser: Browser | null;
    protected page: Page | null;
    protected logger: ILogger;

    constructor(headless: boolean = false, port: number, logger: ILogger = new NoopLogger()) {
        this.port = port;
        this.chrome = null;
        this.logger = logger;

        this.browser = null;
        this.page = null;
    }

    public async setup(url: string | null, chromeFlags: string[]): Promise<void> {
        this.logger.debug('Start chrome');
        this.chrome = await this.startChrome(chromeFlags);
        this.logger.debug('Chrome started');

        const resp = await util.promisify(request)(`http://localhost:${this.port}/json/version`);
        const { webSocketDebuggerUrl } = JSON.parse(resp.body);

        this.logger.debug(`Connecting to chrome on port ${this.port}`);
        this.browser = await connect({ browserWSEndpoint: webSocketDebuggerUrl });
        this.logger.debug(`Connected to chrome instance`);

        this.page = await this.browser.newPage();

        if (url) {
            this.logger.debug(`Navigate to ${url}`);
            this.logger.debug(`Wait for domcontentloaded`);

            await this.page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 1000 * 60,
            });

            this.logger.debug(`Wait for domcontentloaded complete`);
        } else {
            this.logger.debug(`Skip initial page visit`);
        }
    }

    public async closePage(): Promise<void> {
        if (this.page) {
            await this.page.close();
            this.page = null;
            this.logger.debug(`Page closed`);
        }
    }

    public async disconnect(): Promise<void> {
        this.logger.debug(`Closing session`);

        await this.closePage();

        if (this.browser) {
            await this.browser.close();
            this.logger.debug(`Browser closed`);
        }

        if (this.chrome) {
            await this.chrome.kill();
            this.logger.debug(`Chrome killed`);
        }
    }

    public async runPreAuditScripts(setupScripts: IPreAuditScript[]) {
        if (!this.page) {
            throw new Error('Page has not been created. Run setup first');
        }

        this.logger.debug(`Execute ${setupScripts.length} setup script/s`);

        for (let i = 0; i < setupScripts.length; i++) {
            if (!setupScripts[i].execute) {
                throw new Error('Script does not implement the PreAuditScript interface');
            }

            // @ts-ignore
            await setupScripts[i].execute(this.logger, this.page);
        }

        this.logger.debug(`Setup scripts complete`);
    }

    protected async startChrome(chromeFlags: string[]): Promise<LaunchedChrome> {
        this.logger.debug(`Chrome Flags: ${chromeFlags.join('|')}`);
        return await chromeLauncher.launch({ port: this.port, chromeFlags });
    }
}
