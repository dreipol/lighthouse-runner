import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
export default class JsonResultReporter extends AbstractResultReporter {
    key: string;
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
