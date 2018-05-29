import {LoggerInterface} from '@dreipol/lighthouse-config';

export default class NoopLogger implements LoggerInterface {
    // @ts-ignore
    public debug(...args: string[]): void {
    }

    // @ts-ignore
    public error(...args: string[]): void {
    }

    // @ts-ignore
    public info(...args: string[]): void {
    }

    // @ts-ignore
    public setLevel(level: number): void {
    }

}
