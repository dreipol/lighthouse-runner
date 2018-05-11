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
const fs_1 = require("fs");
const request = require('request');
const util = require('util');
class ChromeStarter {
    constructor(url, headless = false, port, logger) {
        this.port = port;
        this.headless = headless;
        this.chrome = null;
        this.url = url;
        this.logger = logger;
        this.browser = null;
        this.page = null;
    }
    setup(setupScripts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print('Start chrome');
            this.chrome = yield this.startChrome(this.headless);
            const resp = yield util.promisify(request)(`http://localhost:${this.port}/json/version`);
            const { webSocketDebuggerUrl } = JSON.parse(resp.body);
            this.browser = yield puppeteer_1.connect({ browserWSEndpoint: webSocketDebuggerUrl });
            this.page = yield this.browser.newPage();
            this.logger.print(`Wait for networkidle0`);
            yield this.page.goto(this.url, {
                waitUntil: 'networkidle0',
            });
            yield this.runPreAuditScripts(this.page, setupScripts);
            yield this.page.close();
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.chrome || !this.browser || !this.page) {
                console.error('Chrome not launched');
                throw new Error('Chrome not launched');
            }
            yield this.browser.close();
            yield this.chrome.kill();
        });
    }
    runPreAuditScripts(page, setupScripts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.print(`Execute ${setupScripts.length} setup script/s`);
            try {
                for (let i = 0; i < setupScripts.length; i++) {
                    yield setupScripts[i].execute(this.logger, page);
                }
                this.logger.print(`Setup scripts complete`);
            }
            catch (e) {
                throw new Error(e);
            }
            this.logger.print(`Closing page`);
            fs_1.writeFileSync('screenshot.png', yield page.screenshot());
            this.logger.print(`Screenshot created`);
        });
    }
    startChrome(headless) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chrome_launcher_1.launch({
                port: this.port,
                chromeFlags: [],
            });
        });
    }
}
exports.default = ChromeStarter;
