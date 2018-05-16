import {existsSync} from 'fs';

const ReportGenerator = require('lighthouse/lighthouse-core/report/v2/report-generator');
import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
import createFolder from '../utils/createFolder';
import writeFile from '../utils/writeFile';

export default class HTMLResultPersister extends AbstractResultReporter {
    public key = 'HTMLResultPersister';

    public async setup(): Promise<void> {
        const {folder} = this.config;

        if (!folder || !this.reportFolder) {
            return;
        }

        if (!existsSync(this.reportFolder)) {
            return await createFolder(this.reportFolder);
        }

        return Promise.resolve();
    }

    public async handle(url: string, results: LighthouseReportResult): Promise<void> {
        if (this.reportFolder) {
            const generator = new ReportGenerator();
            const html = generator.generateReportHtml(results);
            writeFile(url, this.reportFolder, html, 'html', this.config.tag);
            this.logger.print('HTML File created');
        }
    }
}
