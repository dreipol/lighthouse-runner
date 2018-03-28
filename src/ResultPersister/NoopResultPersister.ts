import ResultReporterInterface from './ResultPersisterInterface';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

export default class NoopResultPersister implements ResultReporterInterface {
    // @ts-ignore
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        return Promise.resolve();
    }

    // @ts-ignore
    save(meta: RunnerMeta, config: LighthouseConfigInterface, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        return Promise.resolve(results);
    }
}
