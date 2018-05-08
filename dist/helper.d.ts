import LoggerInterface from "./Interfaces/LoggerInterface";
import LighthouseConfigInterface from "./Interfaces/LighthouseConfigInterface";
import RunnerMeta from "./Interfaces/RunnerMeta";
export declare function coloredFlag(name: string, flag: Boolean): string;
export declare function composeMetaObject(configFile: string, config: LighthouseConfigInterface, printer: LoggerInterface): RunnerMeta;
export declare function remapPersisterNames(config: LighthouseConfigInterface): LighthouseConfigInterface;
