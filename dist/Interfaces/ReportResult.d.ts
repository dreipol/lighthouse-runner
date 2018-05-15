import ReportCategory from './ReportCategory';
import { Budget } from '@dreipol/lighthouse-config';
export default interface ReportResult {
    categories: ReportCategory[];
    budget: Budget;
    url: string;
    tag: string;
    key: string;
}
