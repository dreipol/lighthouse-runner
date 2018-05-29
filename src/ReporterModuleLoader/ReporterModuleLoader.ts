import AbstractResultReporter from '../ResultReporter/AbstractResultReporter';
import JsonResultReporter from '../ResultReporter/JsonResultReporter';
import DashboardJsonResultReporter from '../ResultReporter/DashboardJsonResultReporter';
import HTMLResultPersister from '../ResultReporter/HTMLResultPersister';
import ResultReporterInterface from '../ResultReporter/ResultReporterInterface';
import CLIReporter from '../ResultReporter/CLIReporter';
import {DreihouseConfig, LoggerInterface} from '@dreipol/lighthouse-config';
import ConsoleLogger from '../Logger/ConsoleLogger';

type Constructor<T> = new (...args: any[]) => T;

const MAPPED_REPORTERS: { [index: string]: Constructor<AbstractResultReporter> } = {
    'json': JsonResultReporter,
    'json-dashboard': DashboardJsonResultReporter,
    'html': HTMLResultPersister,
    'cli': CLIReporter,
};

export default class ReporterModuleLoader {

    public static load(reportFolder: string | null, config: DreihouseConfig, logger: LoggerInterface, loaders: Array<string | ResultReporterInterface>): ResultReporterInterface[] {
        const handlers: ResultReporterInterface[] = [];

        loaders.forEach((module: string | ResultReporterInterface) => {
            if (typeof module === 'string') {
                const Reporter = ReporterModuleLoader.getMappedReporter(module);
                if (Reporter) {
                    handlers.push(new Reporter(reportFolder, config, new ConsoleLogger()));
                }
            }

            if (typeof module === 'object') {
                if (!(<ResultReporterInterface> module).setup || !(<ResultReporterInterface> module).handle) {
                    throw new Error('Object does not implement the ResultReporterInterface');
                }
                handlers.push(module);
            }
        });
        return handlers;
    }

    protected static getMappedReporter(key: string) {
        if (!MAPPED_REPORTERS[key]) {
            throw new Error(`No reporter for ${key} found`);
        }

        return MAPPED_REPORTERS[key];
    }
}
