import {existsSync} from 'fs';
import LighthouseReportResult from '../../Interfaces/LighthouseReportResult';
import AbstractReporter from '../AbstractReporter';
import createFolder from '../../utils/createFolder';
import writeFile from '../../utils/writeFile';

const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

export default class HTMLPersister extends AbstractReporter {
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
            const filename = writeFile(url, this.reportFolder, html, 'html', this.config.tag);
            this.logger.debug(`HTML report created ${filename}`);
        }
    }
}
