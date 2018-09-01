import {existsSync} from 'fs';
import AbstractReporter from '../AbstractReporter';
import createFolder from '../../utils/createFolder';
import IReportResult from "../../Interfaces/IReportResult";

export default class DashboardJsonResultReporter extends AbstractReporter {
    public key = 'DashboardJsonResultReporter';

    public async handle(url: string, results: IReportResult): Promise<void> {

        if (this.reportFolder) {
            /*
            const json = this.generateReportJson(url, results.reportCategories.slice(0), this.config.budget, this.config.tag);
            const filename = writeFile(url, this.reportFolder, JSON.stringify(json), 'json', this.config.tag, 'dashboard');
            this.logger.debug(`Json Dashboard created ${filename}`);
            */
        }
        return;
    }

    public async setup(): Promise<void> {
        const {folder} = this.config;

        if (!folder || !this.reportFolder) {
            return Promise.resolve();
        }

        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder);
        }

        return;
    }

    /*
    protected generateReportJson(url: string, categories: IReportCategory[], budget: Budget, tag: string): IJSONReportResult {
        const cleanCategories = categories.map((item) => {
            item = {...item};
            //delete item.audits;
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
    */
}
