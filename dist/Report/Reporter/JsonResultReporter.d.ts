import LighthouseReportResult from '../../Interfaces/LighthouseReportResult';
import AbstractReporter from '../AbstractReporter';
export default class JsonResultReporter extends AbstractReporter {
    key: string;
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
