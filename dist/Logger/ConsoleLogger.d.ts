import LoggerInterface from './LoggerInterface';
export default class ConsoleLogger implements LoggerInterface {
    print(...args: string[]): void;
    error(...args: string[]): void;
}
