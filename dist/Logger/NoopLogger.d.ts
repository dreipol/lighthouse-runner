import { ILogger } from "./ILogger";
export default class NoopLogger implements ILogger {
    debug(...args: string[]): void;
    error(...args: string[]): void;
    info(...args: string[]): void;
    setLevel(level: number): void;
    getLevel(): number;
}
