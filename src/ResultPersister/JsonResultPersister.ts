import {existsSync} from 'fs';

import {createFolder, writeFile} from './helpers';
import RunnerMeta from "../Interfaces/RunnerMeta";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";


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
 * Create json file with reporter result
 *
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<string|undefined> {
    return setup(meta, config)
        .then(() => {
            const {printer, reportFolder} = meta;
            const {saveReport} = config;

            if (reportFolder && saveReport) {
                const filenamne = writeFile(url, reportFolder, JSON.stringify(results), 'json', config.tag);
                printer.print('JSON File created');
                printer.print('Use https://googlechrome.github.io/lighthouse/viewer/ to inspect your report');
                return filenamne;
            }

            return;
        });
}
