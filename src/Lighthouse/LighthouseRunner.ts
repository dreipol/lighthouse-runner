import {resolve} from 'url';

import ILighthouseOptions from '../Interfaces/ILighthouseOptions';
import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';
import {ILighthouseResult} from '../Interfaces/ILighthouseResult';
import RunnerResultTransformer from "../Transformer/RunnerResultTransformer";
import IReportResult from "../Interfaces/IReportResult";

const lighthouse = require('lighthouse');

/**
 * Generates a lighthouse report
 */
export default class LighthouseRunner {
    private logger: LoggerInterface;

    constructor(logger: LoggerInterface) {
        this.logger = logger;
    }

    public async createAudit(targetUrl: string, urlPath: string, opts: ILighthouseOptions, config: DreihouseConfigInterface, port: number): Promise<IReportResult> {
        const url = resolve(targetUrl, urlPath);
        const auditResult =  await this.launchChromeAndRunLighthouse(url, opts, config, port);
        return RunnerResultTransformer.transform(auditResult);
    }

    private async launchChromeAndRunLighthouse(url: string, opts: ILighthouseOptions, config: DreihouseConfigInterface, port: number): Promise<ILighthouseResult> {
        let results: ILighthouseResult;

        try {
            if (port) {
                opts.port = port;
            }

            opts.disableStorageReset = true;
            this.logger.debug('Start lighthouse audit');

            results = await lighthouse(url, opts, {
                extends: 'lighthouse:default',
                settings: {},
                passes: [
                    {
                        passName: 'extraPass',
                        gatherers: [
                            'js-usage',
                        ],
                    },
                ],
                audits: [
                    'byte-efficiency/unused-javascript',
                ],
                // @ts-ignore TODO(bckenny): type extended Config where e.g. category.title isn't required
                categories: {
                    'performance': {
                        auditRefs: [
                            {id: 'unused-javascript', weight: 0, group: 'load-opportunities'},
                        ],
                    },
                },
            });

            this.logger.debug('Lighthouse audit complete');

        } catch (e) {
            throw e;
        }

        return results;
    }
}
