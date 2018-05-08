import LoggerInterface from './Interfaces/LoggerInterface';
import RunnerMeta from "./Interfaces/RunnerMeta";
import LighthouseConfigInterface from "./Interfaces/LighthouseConfigInterface";
import ReportCategory from "./Interfaces/ReportCategory";
export declare function executeReport(meta: RunnerMeta, config: LighthouseConfigInterface, port: Number | null): Promise<Array<Array<ReportCategory>>>;
export declare function execute(configFile: string, port: Number | null, printer?: LoggerInterface): Promise<Array<Array<ReportCategory>>>;
