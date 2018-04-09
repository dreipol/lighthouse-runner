import {existsSync} from 'fs';

import {createFolder, writeFile} from './helpers';
import {
    LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta, ReportCategory,
    BudgetInterface
} from '../Interfaces';

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
 * Generate HTML for dashboard
 */
function generateReportJson(url: string, categories: Array<ReportCategory>, budget: BudgetInterface): string {

    //@ts-ignore
    const _categories = categories.map((item) => {
        item = Object.assign({}, item);
        delete item.audits;
        return item;
    });

    const content = {
        categories: _categories,
        budget,
        url
    };

    return JSON.stringify(content)
}

/**
 * Create html file with reporter result
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
    return setup(meta, config)
        .then(() => {
            const {reportFolder, printer} = meta;
            const {saveReport} = config;

            if (reportFolder && saveReport) {
                const json = generateReportJson(url, results.reportCategories.slice(0), config.budget);
                writeFile(url, reportFolder, json, 'json', '', 'dashboard');
                printer.print('JSON Dashboard File created')
            }
            return results;
        });
}

