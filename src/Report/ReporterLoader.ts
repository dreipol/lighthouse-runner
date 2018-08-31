import AbstractReporter from './AbstractReporter';
import JsonResultReporter from './Reporter/JsonResultReporter';
import DashboardJsonResultReporter from './Reporter/DashboardJsonResultReporter';
import HTMLPersister from './Persister/HTMLPersister';
import ReporterInterface from './ReporterInterface';
import CLIReporter from './Reporter/CLIReporter';
import {DreihouseConfigInterface, LoggerInterface} from '@dreipol/lighthouse-config';
import ConsoleLogger from '../Logger/ConsoleLogger';

type Constructor<T> = new (...args: any[]) => T;

const MAPPED_REPORTERS: { [index: string]: Constructor<AbstractReporter> } = {
    'json': JsonResultReporter,
    'json-dashboard': DashboardJsonResultReporter,
    'html': HTMLPersister,
    'cli': CLIReporter,
};

export default class ReporterLoader {

    public static load(reportFolder: string | null, config: DreihouseConfigInterface, logger: LoggerInterface, loaders: Array<string | ReporterInterface>): ReporterInterface[] {
        const handlers: ReporterInterface[] = [];

        loaders.forEach((module: string | ReporterInterface) => {
            if (typeof module === 'string') {
                const Reporter = ReporterLoader.getMappedReporter(module);
                if (Reporter) {
                    handlers.push(new Reporter(reportFolder, config, new ConsoleLogger()));
                }
            }

            if (typeof module === 'object') {
                if (!(<ReporterInterface> module).setup || !(<ReporterInterface> module).handle) {
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
