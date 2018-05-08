import LoggerInterface from '../Interfaces/LoggerInterface';
export default class ConsoleLogger implements LoggerInterface {
    print(...args: string[]): void;
}
