import AbstractReporter from './AbstractReporter';
import ReporterInterface from './ReporterInterface';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
export default class ReporterLoader {
    static load(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface, loaders: Array<string | ReporterInterface>): ReporterInterface[];
    protected static getMappedReporter(key: string): new (...args: any[]) => AbstractReporter;
}
