import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import AbstractResultReporter from "./AbstractResultReporter";
import ReportCategory from "../Interfaces/ReportCategory";
import BudgetInterface from "../Interfaces/BudgetInterface";
import ReportResult from "../Interfaces/ReportResult";
export default class DashboardJsonResultReporter extends AbstractResultReporter {
    protected generateReportJson(url: string, categories: Array<ReportCategory>, budget: BudgetInterface, tag: string): ReportResult;
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResultInterface): Promise<void>;
}
