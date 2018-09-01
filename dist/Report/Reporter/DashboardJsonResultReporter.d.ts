import AbstractReporter from '../AbstractReporter';
import IReportResult from "../../Interfaces/IReportResult";
export default class DashboardJsonResultReporter extends AbstractReporter {
    key: string;
    handle(url: string, results: IReportResult): Promise<void>;
    setup(): Promise<void>;
}
