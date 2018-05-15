import {resolve} from 'url';

import LighthouseOptions from '../Interfaces/LighthouseOptions';
import ChromeStarter from '../ChromeStarter/ChromeStarter';
import LoggerInterface from '../Logger/LoggerInterface';
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import {DreihouseConfig} from '@dreipol/lighthouse-config';

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
        const starter = new ChromeStarter(url, true, port, this.logger);
        let results: LighthouseReportResult;

        try {

            await starter.setup(config);

            if (config.preAuditScripts) {
                await starter.runPreAuditScripts(config.preAuditScripts);
            }

            if (port) {
                opts.port = port;
            }

            opts.disableStorageReset = true;
            this.logger.print('Start lighthouse audit');
            results = await lighthouse(url, opts, config.report);
            await starter.disconnect();
            delete results.artifacts;

        } catch (e) {
            await starter.disconnect();
            throw e;
        }

        return results;
    }
}
