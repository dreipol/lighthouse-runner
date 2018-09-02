import {existsSync} from 'fs';
import AbstractReporter from '../AbstractReporter';
import createFolder from '../../Utils/createFolder';
import writeFile from '../../Utils/writeFile';
import IReportResult from "../../Interfaces/IReportResult";

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

    public async handle(url: string, results: IReportResult): Promise<void> {
        if (this.reportFolder) {
            const html = ReportGenerator.generateReportHtml(results.lhr);
            const filename = writeFile(url, this.reportFolder, html, 'html', this.config.tag);
            this.logger.debug(`HTML report created ${filename}`);
        }
    }
}
