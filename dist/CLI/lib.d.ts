import ReportCategory from "../Interfaces/ReportCategory";
export declare function report(config: string, silent: boolean, port: number | null): Promise<Array<Array<ReportCategory>>>;
export declare function setup(config: string): Promise<void>;
