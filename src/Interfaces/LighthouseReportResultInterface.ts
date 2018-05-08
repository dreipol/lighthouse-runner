import {Results} from "lighthouse/typings/externs";
import ReportCategory from "./ReportCategory";

export default interface LighthouseReportResultInterface extends Results {
    files: Array<string>;
    reportCategories: Array<ReportCategory>;
}
