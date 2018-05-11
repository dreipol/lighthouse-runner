import LighthouseReportResult from '../Interfaces/LighthouseReportResult';
export default interface ResultReporterInterface {
    key: string;
    setup?(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
