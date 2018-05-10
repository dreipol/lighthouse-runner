import RunnerMeta from "../Interfaces/RunnerMeta";
import LighthouseConfigInterface from "../Interfaces/LighthouseConfigInterface";
import LighthouseOptions from "../Interfaces/LighthouseOptions";
export declare function runReports(meta: RunnerMeta, config: LighthouseConfigInterface, opts: LighthouseOptions, port: Number | null, paths: Array<string>, allResults?: Array<Object>): Promise<any>;
