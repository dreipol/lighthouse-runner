import {existsSync} from 'fs';

import LighthouseReportResult from '../../Interfaces/LighthouseReportResult';
import AbstractReporter from '../AbstractReporter';
import writeFile from '../../utils/writeFile';
import createFolder from '../../utils/createFolder';

export default class JsonResultReporter extends AbstractReporter {
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
            const filename = writeFile(url, this.reportFolder, JSON.stringify(results), 'json', this.config.tag);
            this.logger.debug(`Json report created ${filename}`);
        }

        return;
    }
}
