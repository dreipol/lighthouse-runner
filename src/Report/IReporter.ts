import IReportResult from "../Interfaces/IReportResult";

export default interface IReporter {
    key: string;

    setup?(): Promise<void>;

    handle(url: string, results: IReportResult): Promise<void>;
}
