import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";

export default interface ResultReporterInterface {
    setup(): Promise<void>;
    handle(url: string, results: LighthouseReportResultInterface): Promise<void>;
}
