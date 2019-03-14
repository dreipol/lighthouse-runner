export interface ILogger {
    setLevel(level: number): void;
    getLevel(): number;
    debug(...args: string[]): void;
    info(...args: string[]): void;
    error(...args: string[]): void;
}
