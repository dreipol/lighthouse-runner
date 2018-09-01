import IReportCategory from './IReportCategory';
import { Budget } from '@dreipol/lighthouse-config';
export default interface IJSONReportResult {
    categories: IReportCategory[];
    budget: Budget;
    url: string;
    tag: string;
    key: string;
}
