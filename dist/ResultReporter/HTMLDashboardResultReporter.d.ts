import ReportCategory from "../Interfaces/ReportCategory";
import BudgetInterface from "../Interfaces/BudgetInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
import AbstractResultReporter from "./AbstractResultReporter";
export default class HTMLDashboardResultReporter extends AbstractResultReporter {
    setup(): Promise<void>;
    generateReportHtml(url: string, categories: Array<ReportCategory>, budget: BudgetInterface): string;
    handle(url: string, results: LighthouseReportResultInterface): Promise<void>;
}
