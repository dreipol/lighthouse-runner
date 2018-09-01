import AbstractReporter from './AbstractReporter';
import IReporter from './IReporter';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
declare type Constructor<T> = new (...args: any[]) => T;
export default class ReporterLoader {
    static load(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface, loaders: Array<string | IReporter>): IReporter[];
    protected static getMappedReporter(key: string): Constructor<AbstractReporter>;
}
export {};
