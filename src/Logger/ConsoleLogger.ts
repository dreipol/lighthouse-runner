import { info } from 'fancy-log';
import LoggerInterface from './LoggerInterface';

export default class ConsoleLogger implements LoggerInterface {

    print(...args: string[]): void {
        info(...args);
    }
}
