import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
import ReportCategory from '../Interfaces/ReportCategory';
import ReportResult from '../Interfaces/ReportResult';
import { Budget } from '@dreipol/lighthouse-config';
export default class DashboardJsonResultReporter extends AbstractResultReporter {
    key: string;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
    setup(): Promise<void>;
    protected generateReportJson(url: string, categories: ReportCategory[], budget: Budget, tag: string): ReportResult;
}
