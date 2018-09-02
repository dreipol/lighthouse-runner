import {existsSync} from 'fs';
import AbstractReporter from '../AbstractReporter';
import createFolder from '../../Utils/createFolder';
import IReportResult from "../../Interfaces/IReportResult";
import writeFile from "../../Utils/writeFile";
import {IKeyValue} from "../../Interfaces/IKeyValue";
import DashboardResultValidator from "../../Validator/DashboardResultValidator";
import DashboardResultTransformer from "../../Transformer/DashboardResultTransformer";

export default class DashboardJsonResultReporter extends AbstractReporter {
    public key = 'DashboardJsonResultReporter';
    
    public async handle(url: string, results: IReportResult): Promise<IKeyValue | void> {
        
        if (this.reportFolder) {
            try {
                const json = DashboardResultTransformer.transform(url, results.categoryGroups.slice(0), this.config.budget, this.config.tag);
                DashboardResultValidator.validate(json);
                const filename = writeFile(url, this.reportFolder, JSON.stringify(json), 'json', this.config.tag, 'dashboard');
                this.logger.debug(`Json Dashboard created ${filename}`);
                return {
                    key: this.key,
                    value: filename
                }
            } catch (e) {
                this.logger.error(e.message);
            }
        } else {
            this.logger.error(`Json Dashboard not exported. Report folder not defined`);
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
}
