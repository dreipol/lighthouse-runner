import AbstractResultReporter from '../ResultReporter/AbstractResultReporter';
import LoggerInterface from '../Logger/LoggerInterface';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import { DreihouseConfig } from '@dreipol/lighthouse-config';
export default class ReporterModuleLoader {
    static load(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface, loaders: Array<string | ResultReporterInterface>): ResultReporterInterface[];
    protected static getMappedReporter(key: string): new (...args: any[]) => AbstractResultReporter;
}
