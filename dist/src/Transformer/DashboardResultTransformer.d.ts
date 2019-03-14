import IReportCategory from "../Interfaces/IReportCategory";
import { IBudget } from "../Interfaces/IBudget";
import IJSONReportResult from "../Interfaces/IJSONReportResult";
export default class DashboardResultTransformer {
    static transform(url: string, categories: IReportCategory[], budget: IBudget, tag: string): IJSONReportResult;
}
