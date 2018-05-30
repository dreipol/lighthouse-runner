import {Browser, connect, Page} from 'puppeteer';
import {LoggerInterface, PreAuditScriptInterface} from '@dreipol/lighthouse-config';
import * as chromeLauncher from 'chrome-launcher';
import {LaunchedChrome} from 'chrome-launcher';
import NoopLogger from '../Logger/NoopLogger';

const request = require('request');
const util = require('util');

export default class ChromeStarter {
    protected port: number;
    protected chrome: LaunchedChrome | null;
    protected browser: Browser | null;
    protected page: Page | null;
    protected logger: LoggerInterface;

    constructor(headless: boolean = false, port: number, logger: LoggerInterface = new NoopLogger()) {
        this.port = port;
        this.chrome = null;
        this.logger = logger;

        this.browser = null;
        this.page = null;
    }

    public async setup(url: string, chromeFlags: string[]): Promise<void> {
        this.logger.debug('Start chrome');
        this.chrome = await this.startChrome(chromeFlags);
        this.logger.debug('Chrome started');

        const resp = await util.promisify(request)(`http://localhost:${this.port}/json/version`);
        const {webSocketDebuggerUrl} = JSON.parse(resp.body);

        this.logger.debug(`Connecting to chrome on port ${this.port}`);
        this.browser = await connect({browserWSEndpoint: webSocketDebuggerUrl});
        this.logger.debug(`Connected to chrome instance`);

        this.page = await this.browser.newPage();

        this.logger.debug(`Navigate to ${url}`);
        this.logger.debug(`Wait for networkidle0`);
        await this.page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 1000 * 60,
        });
        this.logger.debug(`Wait for networkidle0 complete`);
    }

    public async disconnect(): Promise<void> {
        this.logger.debug(`Closing session`);

        if (this.page) {
            await this.page.close();
            this.logger.debug(`Page closed`);
        }

        if (this.browser) {
            await this.browser.close();
            this.logger.debug(`Browser closed`);
        }

        if (this.chrome) {
            await this.chrome.kill();
            this.logger.debug(`Chrome killed`);
        }
    }

    public async runPreAuditScripts(setupScripts: PreAuditScriptInterface[]) {
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
        return await chromeLauncher.launch({port: this.port, chromeFlags});
    }
}
