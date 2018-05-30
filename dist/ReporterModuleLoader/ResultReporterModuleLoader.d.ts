import AbstractResultReporter from '../ResultReporter/AbstractResultReporter';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import { DreihouseConfigInterface, LoggerInterface } from '@dreipol/lighthouse-config';
export default class ResultReporterModuleLoader {
    static load(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface, loaders: Array<string | ResultReporterInterface>): ResultReporterInterface[];
    protected static getMappedReporter(key: string): new (...args: any[]) => AbstractResultReporter;
}
