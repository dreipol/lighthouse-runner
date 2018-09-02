import { ILogger } from "./ILogger";
export default class ConsoleLogger implements ILogger {
    protected level: number;
    constructor(level?: number);
    debug(...args: string[]): void;
    error(...args: string[]): void;
    info(...args: string[]): void;
    setLevel(level: number): void;
}
