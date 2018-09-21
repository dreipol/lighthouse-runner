import IReportCategory from './IReportCategory';
export interface ILighthouseResult {
    lhr: Result;
    report: string | string[];
}
export interface Result {
    userAgent: string;
    lighthouseVersion: string;
    fetchTime: string;
    requestedUrl: string;
    finalUrl: string;
    runWarnings: string[];
    audits: Audits;
    categories: {
        [key: string]: IReportCategory;
    };
}
export interface Audits {
    [key: string]: Audit;
}
export interface Audit {
    id: string;
    title: string;
    description: string;
    score: number;
    scoreDisplayMode: string;
    rawValue: boolean;
    displayValue: string;
    explanation?: string;
    errorMessage?: string;
    warnings: string;
    details: any;
}
