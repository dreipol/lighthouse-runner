import LighthouseReportResult from "../Interfaces/LighthouseReportResult";
import AbstractResultReporter from "./AbstractResultReporter";
import ReportCategory from "../Interfaces/ReportCategory";
import Budget from "../Interfaces/Config/Budget";
import ReportResult from "../Interfaces/ReportResult";
export default class DashboardJsonResultReporter extends AbstractResultReporter {
    protected generateReportJson(url: string, categories: Array<ReportCategory>, budget: Budget, tag: string): ReportResult;
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
