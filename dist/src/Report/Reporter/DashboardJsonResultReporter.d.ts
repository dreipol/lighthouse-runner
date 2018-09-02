import AbstractReporter from '../AbstractReporter';
import IReportResult from "../../Interfaces/IReportResult";
import IReportCategory from "../../Interfaces/IReportCategory";
import { IBudget } from "../../Interfaces/BudgetInterface";
import IJSONReportResult from "../../Interfaces/IJSONReportResult";
import { IKeyValue } from "../../Interfaces/IKeyValue";
export default class DashboardJsonResultReporter extends AbstractReporter {
    key: string;
    handle(url: string, results: IReportResult): Promise<IKeyValue | void>;
    setup(): Promise<void>;
    protected generateReportJson(url: string, categories: IReportCategory[], budget: IBudget, tag: string): IJSONReportResult;
}
