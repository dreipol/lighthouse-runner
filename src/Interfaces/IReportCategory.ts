export default interface IReportCategory {
    score: number;
    id: string;
    title?: string;
    name?: string;
    auditRefs: AuditRef[];
    description?: string;
    manualDescription?: string;
}


export interface AuditRef {
    id: string;
    weight: number;
    group: string;
}
