import {resolve} from 'url';

import LighthouseOptions from '../Interfaces/LighthouseOptions';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import {DreihouseConfig, LoggerInterface} from '@dreipol/lighthouse-config';

const lighthouse = require('lighthouse');

export default class LighthouseRunner {
    private logger: LoggerInterface;

    constructor(logger: LoggerInterface) {
        this.logger = logger;
    }

    public async runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: DreihouseConfig, port: number): Promise<LighthouseReportResult> {
        const url = resolve(targetUrl, urlPath);
        return await this.launchChromeAndRunLighthouse(url, opts, config, port);
    }

    private async launchChromeAndRunLighthouse(url: string, opts: LighthouseOptions, config: DreihouseConfig, port: number): Promise<LighthouseReportResult> {
        let results: LighthouseReportResult;

        try {
            if (port) {
                opts.port = port;
            }

            opts.disableStorageReset = true;
            this.logger.debug('Start lighthouse audit');
            results = await lighthouse(url, opts, config.report);
            this.logger.debug('Lighthouse audit complete');
            delete results.artifacts;
        } catch (e) {
            throw e;
        }

        return results;
    }
}
