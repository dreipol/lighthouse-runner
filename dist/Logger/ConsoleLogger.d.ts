import { LoggerInterface } from '@dreipol/lighthouse-config';
export default class ConsoleLogger implements LoggerInterface {
    protected level: number;
    constructor(level?: number);
    debug(...args: string[]): void;
    error(...args: string[]): void;
    info(...args: string[]): void;
    setLevel(level: number): void;
}
