import {existsSync} from 'fs';
import AbstractReporter from '../AbstractReporter';
import writeFile from '../../Utils/writeFile';
import createFolder from '../../Utils/createFolder';
import IReportResult from "../../Interfaces/IReportResult";
import {IKeyValue} from "../../Interfaces/IKeyValue";

export default class JsonResultReporter extends AbstractReporter {
    public key = 'JsonResultReporter';
    
    public async setup(): Promise<void> {
        const {folder} = this.config;
        
        if (!folder || !this.reportFolder) {
            return;
        }
        
        if (!existsSync(this.reportFolder)) {
            return createFolder(this.reportFolder);
        }
        
        return;
    }
    
    public async handle(url: string, results: IReportResult): Promise<IKeyValue | void> {
        if (this.reportFolder) {
            const filename = writeFile(url, this.reportFolder, JSON.stringify(results), 'json', this.config.tag);
            this.logger.debug(`Json report created ${filename}`);
            return {
                key: this.key,
                value: filename,
            };
        }
        
        return;
    }
}
