import {existsSync} from 'fs';

const ReportGenerator = require('lighthouse/lighthouse-core/report/v2/report-generator');
import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
import AbstractResultReporter from "./AbstractResultReporter";
import writeFile from "../utils/writeFile";
import createFolder from "../utils/createFolder";

export default class HTMLResultPersister extends AbstractResultReporter {

    async setup(): Promise<void> {
        const {saveReport, folder} = this.config;

        if (!saveReport || !folder || !this.reportFolder) {
            return;
        }

        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder)
        }

        return Promise.resolve();
    }

    async handle(url: string, results: LighthouseReportResult): Promise<void> {
        const {saveReport} = this.config;

        if (this.reportFolder && saveReport) {
            const generator = new ReportGenerator();
            const html = generator.generateReportHtml(results);
            writeFile(url, this.reportFolder, html, 'html', this.config.tag);
            this.logger.print('HTML File created');
        }
    }
}
