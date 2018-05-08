import LoggerInterface from '../Interfaces/LoggerInterface';
export default class NoopLogger implements LoggerInterface {
    print(...args: string[]): void;
}
