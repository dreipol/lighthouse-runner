import IReportCategory from './IReportCategory';
import { IBudget } from "./IBudget";
export default interface IJSONReportResult {
    categories: IReportCategory[];
    budget: IBudget;
    url: string;
    tag: string;
    key: string;
    version: string;
}
