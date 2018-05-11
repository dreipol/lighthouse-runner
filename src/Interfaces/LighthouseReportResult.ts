import {Results} from 'lighthouse/typings/externs';
import ReportCategory from './ReportCategory';

export default interface LighthouseReportResult extends Results {
    reportCategories: ReportCategory[];
}
