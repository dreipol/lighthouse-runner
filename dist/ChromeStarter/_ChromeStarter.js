"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const chrome_launcher_1 = require("chrome-launcher");
const request = require('request');
const util = require('util');
class ChromeStarter {
    constructor(url, headless = false, port, logger) {
        this.port = port;
        this.chrome = null;
        this.url = url;
        this.logger = logger;
        this.browser = null;
        this.page = null;
    }
    setup(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print('Start chrome');
            this.chrome = yield this.startChrome(config.chromeFlags);
            this.logger.print('Chrome started');
            const resp = yield util.promisify(request)(`http://localhost:${this.port}/json/version`);
            const { webSocketDebuggerUrl } = JSON.parse(resp.body);
            this.logger.print(`Connecting to chrome on port ${this.port}`);
            this.browser = yield puppeteer_1.connect({ browserWSEndpoint: webSocketDebuggerUrl });
            this.logger.print(`Connected to chrome instance`);
            this.page = yield this.browser.newPage();
            this.logger.print(`Navigate to ${this.url}`);
            this.logger.print(`Wait for networkidle0`);
            yield this.page.goto(this.url, {
                waitUntil: 'networkidle0',
                timeout: 1000 * 60,
            });
            this.logger.print(`Wait for networkidle0 complete`);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print(`Closing session`);
            if (this.page) {
                yield this.page.close();
                this.logger.print(`Page closed`);
            }
            if (this.browser) {
                yield this.browser.close();
                this.logger.print(`Browser closed`);
            }
            if (this.chrome) {
                yield this.chrome.kill();
                this.logger.print(`Chrome killed`);
            }
        });
    }
    runPreAuditScripts(setupScripts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                throw new Error('Page has not been created. Run setup first');
            }
            this.logger.print(`Execute ${setupScripts.length} setup script/s`);
            for (let i = 0; i < setupScripts.length; i++) {
                if (!setupScripts[i].execute) {
                    throw new Error('Script does not implement the PreAuditScript interface');
                }
                yield setupScripts[i].execute(this.logger, this.page);
            }
            this.logger.print(`Setup scripts complete`);
        });
    }
    startChrome(chromeFlags) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chrome_launcher_1.launch({
                port: this.port,
                chromeFlags,
            });
        });
    }
}
exports.default = ChromeStarter;
//# sourceMappingURL=_ChromeStarter.js.map