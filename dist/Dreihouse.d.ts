import LoggerInterface from './Logger/LoggerInterface';
import LighthouseConfigInterface from "./Interfaces/LighthouseConfigInterface";
import ReportCategory from "./Interfaces/ReportCategory";
export default class Dreihouse {
    configFile: string;
    config: LighthouseConfigInterface;
    logger: LoggerInterface;
    constructor(configFile: string, logger?: LoggerInterface);
    private executeReport(reportFolder, port);
    execute(port: Number | null): Promise<Array<Array<ReportCategory>>>;
}
