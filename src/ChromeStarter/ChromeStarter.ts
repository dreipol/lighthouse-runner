import {Browser, connect, Page} from 'puppeteer';
import PreAuditScript from '../PreAuditScript/PreAuditScript';
import LoggerInterface from '../Logger/LoggerInterface';
import {launch, LaunchedChrome} from 'chrome-launcher';
import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';

const request = require('request');
const util = require('util');

export default class ChromeStarter {
    private port: number;
    private chrome: LaunchedChrome | null;
    private browser: Browser | null;
    private page: Page | null;
    private url: string;
    private logger: LoggerInterface;

    constructor(url: string, headless: boolean = false, port: number, logger: LoggerInterface) {
        this.port = port;
        this.chrome = null;
        this.url = url;
        this.logger = logger;

        this.browser = null;
        this.page = null;
    }

    public async setup(config: DreihouseConfig): Promise<void> {
        this.logger.print('Start chrome');
        this.chrome = await this.startChrome(config.chromeFlags);

        const resp = await util.promisify(request)(`http://localhost:${this.port}/json/version`);
        const {webSocketDebuggerUrl} = JSON.parse(resp.body);

        this.browser = await connect({browserWSEndpoint: webSocketDebuggerUrl});
        this.page = await this.browser.newPage();

        this.logger.print(`Wait for networkidle0`);
        await this.page.goto(this.url, {
            waitUntil: 'networkidle0',
            timeout: 3000000,
        });
    }

    public async disconnect(): Promise<void> {
        if (!this.chrome || !this.browser || !this.page) {
            console.error('Chrome not launched');
            throw new Error('Chrome not launched');
        }

        await this.browser.close();
        await this.chrome.kill();
    }

    public async runPreAuditScripts(setupScripts: PreAuditScript[]) {
        if (!this.page) {
            throw new Error('Page has not been created. Run setup first');
        }

        this.logger.print(`Execute ${setupScripts.length} setup script/s`);
        try {
            for (let i = 0; i < setupScripts.length; i++) {
                if (!setupScripts[i].execute) {
                    throw new Error('Script does not implement the PreAuditScript interface');
                }
                await setupScripts[i].execute(this.logger, this.page);
            }
            this.logger.print(`Setup scripts complete`);
        } catch (e) {
            throw new Error(e);
        }
    }

    private async startChrome(chromeFlags: string[]): Promise<LaunchedChrome> {
        return await launch({
            port: this.port,
            chromeFlags,
        });
    }
}
