import AbstractResultReporter from './AbstractResultReporter';
import ResultReporterInterface from './ResultReporterInterface';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
declare type Constructor<T> = new (...args: any[]) => T;
export default class ResultReporterLoader {
    static load(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface, loaders: Array<string | ResultReporterInterface>): ResultReporterInterface[];
    protected static getMappedReporter(key: string): Constructor<AbstractResultReporter>;
}
export {};
