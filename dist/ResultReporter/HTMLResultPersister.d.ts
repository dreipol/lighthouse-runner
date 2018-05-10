import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
import AbstractResultReporter from "./AbstractResultReporter";
export default class HTMLResultPersister extends AbstractResultReporter {
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
