import {existsSync, writeFileSync} from 'fs';
import {parse} from "url";
import {join} from 'path';

import ResultReporterInterface from './ResultPersisterInterface';
import {createFolder, formatDate, getPathname} from './helpers';
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

    writeFile(url: string, folder: string, results: LighthouseReportResultInterface) {

        const reportUrl = parse(url);
        const pathname = getPathname(url);
        const filenamePrefix = formatDate(new Date());
        const filename = join(folder, `${filenamePrefix}__${reportUrl.hostname}__${pathname}.json`);

        writeFileSync(filename, JSON.stringify(results));
    }

    save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        const {printer, reportFolder} = meta;
        const {saveReport} = config;

        if (reportFolder && saveReport) {
            this.writeFile(url, reportFolder, results);
            printer.print(`Report created and saved`);
            printer.print(`Save report to: ${reportFolder}`);
            printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }
        return Promise.resolve(results);
    }
}
