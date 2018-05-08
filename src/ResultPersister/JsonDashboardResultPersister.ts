import {existsSync} from 'fs';

import {createFolder, writeFile} from './helpers';
import RunnerMeta from "../Interfaces/RunnerMeta";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import ReportCategory from "../Interfaces/ReportCategory";
import BudgetInterface from "../Interfaces/BudgetInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import ReportResult from "../Interfaces/ReportResult";

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
function generateReportJson(url: string, categories: Array<ReportCategory>, budget: BudgetInterface, tag: string): ReportResult {

    //@ts-ignore
    const _categories = categories.map((item) => {
        item = Object.assign({}, item);
        delete item.audits;
        return item;
    });

    return {
        categories: _categories,
        budget,
        url,
        tag,
        key: `${tag}:${url}`
    };
}

/**
 * Create html file with reporter result
 */
export default function save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<string | undefined> {
    return setup(meta, config)
        .then(() => {
            const {reportFolder, printer} = meta;
            const {saveReport} = config;

            if (reportFolder && saveReport) {
                const json = generateReportJson(url, results.reportCategories.slice(0), config.budget, config.tag);
                const filename = writeFile(url, reportFolder, JSON.stringify(json), 'json', config.tag, 'dashboard');
                printer.print('JSON Dashboard File created');
                return filename;
            }
            return;
        });
}

