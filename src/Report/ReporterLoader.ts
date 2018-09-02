import AbstractReporter from './AbstractReporter';
import JsonResultReporter from './Reporter/JsonResultReporter';
import DashboardJsonResultReporter from './Reporter/DashboardJsonResultReporter';
import HTMLPersister from './Persister/HTMLPersister';
import IReporter from './IReporter';
import CLIReporter from './Reporter/CLIReporter';
import ConsoleLogger from '../Logger/ConsoleLogger';
import {IDreihouseConfig} from "../Interfaces/IDreihouseConfig";
import {ILogger} from "../Logger/ILogger";

type Constructor<T> = new (...args: any[]) => T;

const MAPPED_REPORTERS: { [index: string]: Constructor<AbstractReporter> } = {
    'json': JsonResultReporter,
    'json-dashboard': DashboardJsonResultReporter,
    'html': HTMLPersister,
    'cli': CLIReporter,
};

/**
 * Auto load reporter by their keyed name
 */
export default class ReporterLoader {

    public static load(reportFolder: string | null, config: IDreihouseConfig, logger: ILogger, loaders: Array<string | IReporter>): IReporter[] {
        const handlers: IReporter[] = [];

        loaders.forEach((module: string | IReporter) => {
            if (typeof module === 'string') {
                const Reporter = ReporterLoader.getMappedReporter(module);
                if (Reporter) {
                    handlers.push(new Reporter(reportFolder, config, new ConsoleLogger()));
                }
            }

            if (typeof module === 'object') {
                if (!(<IReporter> module).setup || !(<IReporter> module).handle) {
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
