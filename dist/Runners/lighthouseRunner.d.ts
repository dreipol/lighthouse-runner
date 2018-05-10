import LighthouseOptions from "../Interfaces/LighthouseOptions";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseReportResultInterface from "../Interfaces/LighthouseReportResultInterface";
export default function runReport(targetUrl: string, urlPath: string, opts: LighthouseOptions, config: LighthouseConfigInterface, port: Number | null): Promise<LighthouseReportResultInterface>;
