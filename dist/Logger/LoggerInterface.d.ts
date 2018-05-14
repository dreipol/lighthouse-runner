export default interface LoggerInterface {
    print(...args: string[]): void;
    error(...args: string[]): void;
}
