import IReportCategory from './IReportCategory';
import { Result } from "./ILighthouseResult";
export default interface IReportResult {
    categoryGroups: IReportCategory[];
    lhr: Result;
}
