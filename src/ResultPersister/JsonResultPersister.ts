import {existsSync} from 'fs';

import ResultReporterInterface from './ResultPersisterInterface';
import {createFolder, writeFile} from './helpers';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

export default class JsonResultPersister implements ResultReporterInterface {
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
        const {printer, reportFolder} = meta;
        const {saveReport} = config;

        if (reportFolder && saveReport) {
            writeFile(url, reportFolder, JSON.stringify(results), 'json');
            printer.print(`Report created and saved`);
            printer.print(`Save report to: ${reportFolder}`);
            printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }
        return Promise.resolve(results);
    }
}
