import { LoggerInterface } from '@dreipol/lighthouse-config';
export default class NoopLogger implements LoggerInterface {
    debug(...args: string[]): void;
    error(...args: string[]): void;
    info(...args: string[]): void;
    setLevel(level: number): void;
}
