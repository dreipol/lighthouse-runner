import {existsSync} from 'fs';
const ReportGenerator = require('lighthouse/lighthouse-core/report/v2/report-generator');

import ResultReporterInterface from './ResultPersisterInterface';
import {createFolder, writeFile} from './helpers';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

export default class HTMLResultPersister implements ResultReporterInterface {
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        const {saveReport, folder} = config;
        const {reportFolder} = meta;

        if (!saveReport || !folder || !reportFolder) {
            return Promise.resolve();
        }

        if (!existsSync(reportFolder)) {
            return createFolder(reportFolder)
        }

        return Promise.resolve();
    }



    save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        const {reportFolder} = meta;
        const {saveReport} = config;

        if (reportFolder && saveReport) {
            const generator = new ReportGenerator();
            const html = generator.generateReportHtml(results);
            writeFile(url, reportFolder, html, 'html');
        }
        return Promise.resolve(results);
    }
}
