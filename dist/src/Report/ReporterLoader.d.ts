import AbstractReporter from './AbstractReporter';
import IReporter from './IReporter';
import { IDreihouseConfig } from "../Interfaces/IDreihouseConfig";
import { ILogger } from "../Logger/ILogger";
export default class ReporterLoader {
    static load(reportFolder: string | null, config: IDreihouseConfig, logger: ILogger, loaders: Array<string | IReporter>): IReporter[];
    protected static getMappedReporter(key: string): new (...args: any[]) => AbstractReporter;
}
