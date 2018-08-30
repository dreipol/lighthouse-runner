import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
import AbstractResultReporter from './AbstractResultReporter';
export default class CLIReporter extends AbstractResultReporter {
    key: string;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
    private checkBudget;
    private printResults;
}
