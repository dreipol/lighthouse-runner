import LighthouseReportResult from '../../Interfaces/LighthouseReportResult';
import AbstractReporter from '../AbstractReporter';
export default class CLIReporter extends AbstractReporter {
    key: string;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
    private checkBudget(caregory, budget);
    private printResults(url, categories, budget);
}
