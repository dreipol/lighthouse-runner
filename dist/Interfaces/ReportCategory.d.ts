export default interface ReportCategory {
    score: number;
    id: string;
    name: string;
    description: string;
    audits: Array<Object>;
}
