import { ILogger } from "./ILogger";
export declare const ERROR_LEVEL = 1;
export declare const INFO_LEVEL = 2;
export declare const DEBUG_LEVEL = 3;
export default class ConsoleLogger implements ILogger {
    protected level: number;
    constructor(level?: number);
    debug(...args: string[]): void;
    error(...args: string[]): void;
    info(...args: string[]): void;
    setLevel(level: number): void;
    getLevel(): number;
}
