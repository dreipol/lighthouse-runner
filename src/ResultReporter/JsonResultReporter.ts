import {existsSync} from 'fs';

import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
import writeFile from '../utils/writeFile';
import createFolder from '../utils/createFolder';

export default class JsonResultReporter extends AbstractResultReporter {
    public key = 'JsonResultReporter';

    public async setup(): Promise<void> {
        const {folder} = this.config;

        if (!folder || !this.reportFolder) {
            return;
        }

        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder);
        }

        return;
    }

    public async handle(url: string, results: LighthouseReportResult): Promise<void> {
        if (this.reportFolder) {
            writeFile(url, this.reportFolder, JSON.stringify(results), 'json', this.config.tag);
            this.logger.print('JSON File created');
            this.logger.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }

        return;
    }
}
