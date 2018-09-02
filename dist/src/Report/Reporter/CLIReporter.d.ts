import AbstractReporter from '../AbstractReporter';
import IReportResult from "../../Interfaces/IReportResult";
export default class CLIReporter extends AbstractReporter {
    key: string;
    handle(url: string, results: IReportResult): Promise<void>;
    private checkBudget(caregory, budget);
    private printResults(url, categories, budget);
}
