import {existsSync} from 'fs';

import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
import ReportCategory from '../Interfaces/ReportCategory';
import Budget from '../Interfaces/Config/Budget';
import ReportResult from '../Interfaces/ReportResult';
import writeFile from '../utils/writeFile';
import createFolder from '../utils/createFolder';

export default class DashboardJsonResultReporter extends AbstractResultReporter {
    public key = 'DashboardJsonResultReporter';

    public async handle(url: string, results: LighthouseReportResult): Promise<void> {
        const {saveReport} = this.config;

        if (this.reportFolder && saveReport) {
            const json = this.generateReportJson(url, results.reportCategories.slice(0), this.config.budget, this.config.tag);
            writeFile(url, this.reportFolder, JSON.stringify(json), 'json', this.config.tag, 'dashboard');
            this.logger.print('JSON Dashboard File created');
        }
        return;
    }

    public async setup(): Promise<void> {
        const {saveReport, folder} = this.config;

        if (!saveReport || !folder || !this.reportFolder) {
            return Promise.resolve();
        }

        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder);
        }

        return;
    }

    protected generateReportJson(url: string, categories: ReportCategory[], budget: Budget, tag: string): ReportResult {
        const cleanCategories = categories.map((item) => {
            item = {...item};
            delete item.audits;
            return item;
        });

        return {
            categories: cleanCategories,
            budget,
            url,
            tag,
            key: `${tag}:${url}`,
        };
    }
}
