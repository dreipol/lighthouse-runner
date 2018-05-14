import LoggerInterface from './LoggerInterface';

export default class NoopLogger implements LoggerInterface {
    // @ts-ignore
    public print(...args: string[]): void {
    }

    // @ts-ignore
    public error(...args: string[]): void {
    }
}
