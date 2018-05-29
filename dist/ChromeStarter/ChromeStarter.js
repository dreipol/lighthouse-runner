"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const chromeLauncher = __importStar(require("chrome-launcher"));
const NoopLogger_1 = __importDefault(require("../Logger/NoopLogger"));
const request = require('request');
const util = require('util');
class ChromeStarter {
    constructor(headless = false, port, logger = new NoopLogger_1.default()) {
        this.port = port;
        this.chrome = null;
        this.logger = logger;
        this.browser = null;
        this.page = null;
    }
    setup(url, chromeFlags) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('Start chrome');
            this.chrome = yield this.startChrome(chromeFlags);
            this.logger.debug('Chrome started');
            const resp = yield util.promisify(request)(`http://localhost:${this.port}/json/version`);
            const { webSocketDebuggerUrl } = JSON.parse(resp.body);
            this.logger.debug(`Connecting to chrome on port ${this.port}`);
            this.browser = yield puppeteer_1.connect({ browserWSEndpoint: webSocketDebuggerUrl });
            this.logger.debug(`Connected to chrome instance`);
            this.page = yield this.browser.newPage();
            this.logger.debug(`Navigate to ${url}`);
            this.logger.debug(`Wait for networkidle0`);
            yield this.page.goto(url, {
                waitUntil: 'networkidle0',
                timeout: 1000 * 60,
            });
            this.logger.debug(`Wait for networkidle0 complete`);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Closing session`);
            if (this.page) {
                yield this.page.close();
                this.logger.debug(`Page closed`);
            }
            if (this.browser) {
                yield this.browser.close();
                this.logger.debug(`Browser closed`);
            }
            if (this.chrome) {
                yield this.chrome.kill();
                this.logger.debug(`Chrome killed`);
            }
        });
    }
    runPreAuditScripts(setupScripts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.page) {
                throw new Error('Page has not been created. Run setup first');
            }
            this.logger.debug(`Execute ${setupScripts.length} setup script/s`);
            for (let i = 0; i < setupScripts.length; i++) {
                if (!setupScripts[i].execute) {
                    throw new Error('Script does not implement the PreAuditScript interface');
                }
                yield setupScripts[i].execute(this.logger, this.page);
            }
            this.logger.debug(`Setup scripts complete`);
        });
    }
    startChrome(chromeFlags) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`Chrome Flags: ${chromeFlags.join('|')}`);
            return yield chromeLauncher.launch({ port: this.port, chromeFlags });
        });
    }
}
exports.default = ChromeStarter;
//# sourceMappingURL=ChromeStarter.js.map