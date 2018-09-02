import IReportCategory from './IReportCategory';
import { IBudget } from "./BudgetInterface";
export default interface IJSONReportResult {
    categories: IReportCategory[];
    budget: IBudget;
    url: string;
    tag: string;
    key: string;
}
