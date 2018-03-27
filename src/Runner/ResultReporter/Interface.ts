import { LighthouseReportResultInterface, LighthouseConfigInterface, RunnerMeta } from '../Interfaces';

export default interface ResultReporterInterface {
    setup(meta: RunnerMeta, config: LighthouseConfigInterface): Promise<any>;
    save(results: LighthouseReportResultInterface): Promise<undefined>;
}