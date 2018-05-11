import {resolve} from 'url';

const lighthouse = require('lighthouse');
import {launch} from 'chrome-launcher';

import LighthouseOptions from '../Interfaces/LighthouseOptions';
import DreihouseConfig from '../Interfaces/Config/DreihouseConfig';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';

export default class LighthouseRunner {

    public async runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfig, port: number | null): Promise<LighthouseReportResult> {
        const url = resolve(targetUrl, urlPath);
        return await this.launchChromeAndRunLighthouse(url, opts, config, port);
    }

    private async launchChromeAndRunLighthouse(url: string, opts: LighthouseOptions, config: DreihouseConfig, port: number | null): Promise<LighthouseReportResult> {
        let chrome = null;
        if (!port) {
            chrome = await launch({chromeFlags: opts.chromeFlags});
            port = chrome.port;
        }

        if (port) {
            opts.port = port;
        }

        const results: LighthouseReportResult = await lighthouse(url, opts, config);
        delete results.artifacts;
        if (chrome) {
            await chrome.kill();
        }
        return results;
    }
}
