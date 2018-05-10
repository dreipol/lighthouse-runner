import LoggerInterface from './LoggerInterface';
export default class NoopLogger implements LoggerInterface {
    print(...args: string[]): void;
}
