import {LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta} from '../Interfaces';

export default interface ResultPersisterInterface {
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any>;

    save(meta: RunnerMeta, url: string, results: LighthouseReportResultInterface): Promise<LighthouseReportResultInterface>;
}