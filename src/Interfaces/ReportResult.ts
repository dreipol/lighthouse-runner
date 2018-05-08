import ReportCategory from "./ReportCategory";
import BudgetInterface from "./BudgetInterface";

export default interface ReportResult{
    categories: ReportCategory[];
    budget: BudgetInterface;
    url: string;
    tag: string;
    key: string;
}
