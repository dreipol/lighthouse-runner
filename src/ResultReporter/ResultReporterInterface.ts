import LighthouseReportResult from "../Interfaces/LighthouseReportResult";

export default interface ResultReporterInterface {
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResult): Promise<void>;
}
