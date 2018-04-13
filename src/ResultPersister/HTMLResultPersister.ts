import {existsSync} from 'fs';

const ReportGenerator = require('lighthouse/lighthouse-core/report/v2/report-generator');

import {createFolder, writeFile} from './helpers';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

/**
 * Setup required folders
 */
function setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
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

/**
 * Create html file with reporter result
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<string|undefined> {
    return setup(meta, config)
        .then(() => {
            const {reportFolder, printer} = meta;
            const {saveReport} = config;

            if (reportFolder && saveReport) {
                const generator = new ReportGenerator();
                const html = generator.generateReportHtml(results);
                const filename = writeFile(url, reportFolder, html, 'html', config.tag);
                printer.print('HTML File created');
                return filename;
            }

            return;
        });
}

