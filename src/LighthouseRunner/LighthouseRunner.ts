import {resolve} from 'url';
const lighthouse = require('lighthouse');
import {launch} from 'chrome-launcher';

import LighthouseOptions from "../Interfaces/LighthouseOptions";
import LaunchedChrome from "../Interfaces/LaunchedChrome";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";

export default class LighthouseRunner {

    private async getChromePort(opts: LighthouseOptions, port: Number | null): Promise<LaunchedChrome> {
        if (port) {
            return {
                port: port,
                chrome: null,
            };
        }

        const chrome = await launch({chromeFlags: opts.chromeFlags})
        return {chrome, port: chrome.port};
    }

    private async launchChromeAndRunLighthouse(_url: String, opts: LighthouseOptions, config: LighthouseConfigInterface, _port: Number | null): Promise<LighthouseReportResultInterface> {
        const {chrome, port} = await this.getChromePort(opts, _port);
        opts.port = port;

        const results: LighthouseReportResultInterface = await lighthouse(_url, opts, config)
        delete results.artifacts;
        if (chrome) {
            await chrome.kill();
        }
        return results;
    }

    public async runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: LighthouseConfigInterface, port: Number | null): Promise<LighthouseReportResultInterface> {
        let url = resolve(targetUrl, urlPath);
        return await this.launchChromeAndRunLighthouse(url, opts, config, port);
    }
}
