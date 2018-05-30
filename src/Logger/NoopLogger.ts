import {LoggerInterface} from '@dreipol/lighthouse-config';

export default class NoopLogger implements LoggerInterface {
    public debug(...args: string[]): void {
        //
    }

    public error(...args: string[]): void {
        //
    }

    public info(...args: string[]): void {
        //
    }

    public setLevel(level: number): void {
        //
    }
}
