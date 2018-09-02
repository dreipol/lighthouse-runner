import IReportCategory from './IReportCategory';
import {Result} from "./ILighthouseResult";
import {IKeyValue} from "./IKeyValue";

export default interface IReportResult {
    categoryGroups: IReportCategory[];
    lhr: Result;
    reporters: IKeyValue[] | null;
}
