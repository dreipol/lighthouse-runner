import ResultReporterInterface from './Interface';
import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

export default class NoopResultReporter implements ResultReporterInterface {
    // @ts-ignore
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any> {
        return Promise.resolve();
    }

    // @ts-ignore
    save(meta: RunnerMeta, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface> {
        return Promise.resolve(results);
    }
}
