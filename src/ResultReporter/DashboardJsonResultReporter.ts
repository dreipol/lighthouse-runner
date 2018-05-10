import {existsSync} from 'fs';

import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import AbstractResultReporter from "./AbstractResultReporter";
import ReportCategory from "../Interfaces/ReportCategory";
import BudgetInterface from "../Interfaces/BudgetInterface";
import ReportResult from "../Interfaces/ReportResult";
import writeFile from "../utils/writeFile";
import createFolder from "../utils/createFolder";

export default class DashboardJsonResultReporter extends AbstractResultReporter {

    protected generateReportJson(url: string, categories: Array<ReportCategory>, budget: BudgetInterface, tag: string): ReportResult {

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

    async setup(): Promise<void> {
        const {saveReport, folder} = this.config;

        if (!saveReport || !folder || !this.reportFolder) {
            return Promise.resolve();
        }

        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder)
        }

        return Promise.resolve();
    }

    async handle(url: string, results: LighthouseReportResultInterface): Promise<void> {
        const {saveReport} = this.config;

        if (this.reportFolder && saveReport) {
            const json = this.generateReportJson(url, results.reportCategories.slice(0), this.config.budget, this.config.tag);
            writeFile(url, this.reportFolder, JSON.stringify(json), 'json', this.config.tag, 'dashboard');
            this.logger.print('JSON Dashboard File created');
        }
        return;
    }
}
