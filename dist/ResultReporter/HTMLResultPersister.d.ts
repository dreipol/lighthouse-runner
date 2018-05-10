import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import AbstractResultReporter from "./AbstractResultReporter";
export default class HTMLResultPersister extends AbstractResultReporter {
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResultInterface): Promise<void>;
}
