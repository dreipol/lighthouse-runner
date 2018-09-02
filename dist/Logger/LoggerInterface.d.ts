export interface LoggerInterface {
    setLevel(level: number): void;
    debug(...args: string[]): void;
    info(...args: string[]): void;
    error(...args: string[]): void;
}
