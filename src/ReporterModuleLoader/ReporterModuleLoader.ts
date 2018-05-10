import AbstractResultReporter from "../ResultReporter/AbstractResultReporter";
import JsonResultReporter from '../ResultReporter/JsonResultReporter';
import DashboardJsonResultReporter from '../ResultReporter/DashboardJsonResultReporter';
import HTMLResultPersister from "../ResultReporter/HTMLResultPersister";
import DreihouseConfig from "../Interfaces/Config/DreihouseConfig";
import LoggerInterface from "../Logger/LoggerInterface";
import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";

type Constructor<T> = new (...args: any[]) => T;

// @ts-ignore
const MAPPED_REPORTERS: { [index: string]: Constructor<AbstractResultReporter> } = {
    'json': JsonResultReporter,
    'json-dashboard': DashboardJsonResultReporter,
    'html': HTMLResultPersister,
};

export default class ReporterModuleLoader {

    static getMappedReporter(key: string) {
        if (!MAPPED_REPORTERS[key]) {
            console.warn(`No reporterfor ${key} found`);
            return null;
        }

        return MAPPED_REPORTERS[key]
    }

    static load(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface, loaders: Array<string | ResultReporterInterface>): ResultReporterInterface[] {
        const handlers: ResultReporterInterface[] = [];

        loaders.forEach((module: string | ResultReporterInterface) => {
            if (typeof module === 'string') {
                const Reporter = ReporterModuleLoader.getMappedReporter(module);
                if(Reporter) {
                    handlers.push(new Reporter(reportFolder, config, logger));
                }
            }

            if (typeof module === 'object') {
                if (!(<ResultReporterInterface>module).setup || !(<ResultReporterInterface>module).handle) {
                    console.warn('Object does not implement the ResultReporterInterface');
                }
                handlers.push(module);
            }
        });
        return handlers;
    }
}
