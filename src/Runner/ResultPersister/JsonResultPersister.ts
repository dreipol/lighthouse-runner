import {existsSync, writeFileSync} from 'fs';
import {parse} from "url";
import {join, resolve} from 'path';

import ResultReporterInterface from './ResultPersisterInterface';
import {createFolder, formatDate, getPathname} from './helpers';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

export default class JsonResultPersister implements ResultReporterInterface {
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        const {saveReport, folder} = config;
        if (!saveReport || !folder) {
            return Promise.resolve();
        }

        let reportFolder: string = resolve(meta.configFolder, folder);
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

    save(meta: RunnerMeta, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        const {printer, reportFolder} = meta;

        if (reportFolder) {
            this.writeFile(url, reportFolder, results);
            printer.print(`Report created and saved`);
            printer.print(`Save report to: ${reportFolder}`);
            printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
        }
        return Promise.resolve(results);
    }
}
