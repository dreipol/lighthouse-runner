import LoggerInterface from '../Interfaces/LoggerInterface';

export default class NoopLogger implements LoggerInterface {
    // @ts-ignore
    print(...args: string[]): void {
    }
}
