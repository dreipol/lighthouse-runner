import { info, error as flError } from 'fancy-log';
import LoggerInterface from './LoggerInterface';

export default class ConsoleLogger implements LoggerInterface {
    public print(...args: string[]): void {
        info(...args);
    }

    public error(...args: string[]): void {
        flError(...args);
    }
}
