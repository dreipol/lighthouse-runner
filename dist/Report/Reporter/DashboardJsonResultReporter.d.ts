import AbstractReporter from '../AbstractReporter';
import IReportResult from "../../Interfaces/IReportResult";
import { IKeyValue } from "../../Interfaces/IKeyValue";
export default class DashboardJsonResultReporter extends AbstractReporter {
    key: string;
    handle(url: string, results: IReportResult): Promise<IKeyValue | void>;
    setup(): Promise<void>;
}
