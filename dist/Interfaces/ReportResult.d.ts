import ReportCategory from "./ReportCategory";
import Budget from "./Config/Budget";
export default interface ReportResult {
    categories: ReportCategory[];
    budget: Budget;
    url: string;
    tag: string;
    key: string;
}
