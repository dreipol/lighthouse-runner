import { existsSync } from 'fs';
import { resolve } from 'path';

import ResultReporterInterface from './Interface';
import { createFolder } from './helpers';
import { LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta } from '../Interfaces';

export default class JsonResultReporter implements ResultReporterInterface {
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        const { saveReport, folder } = config;
        if (!saveReport || !folder) {
            return Promise.resolve();
        }

        let reportFolder: string = resolve(meta.configFolder, folder);
        if (!existsSync(reportFolder)) {
            return createFolder(reportFolder)
        }

        return Promise.resolve();
    }

    save(results: LighthouseReportResultInterface): Promise<any> {
        console.log(results)
        return Promise.resolve();
    }
}
