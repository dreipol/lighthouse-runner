import AbstractResultReporter from "../ResultReporter/AbstractResultReporter";
import DreihouseConfig from "../Interfaces/Config/DreihouseConfig";
import LoggerInterface from "../Logger/LoggerInterface";
import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";
export default class ReporterModuleLoader {
    static getMappedReporter(key: string): (new (...args: any[]) => AbstractResultReporter) | null;
    static load(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface, loaders: Array<string | ResultReporterInterface>): ResultReporterInterface[];
}
