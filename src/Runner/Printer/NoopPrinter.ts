import PrinterInterface from './Interface';

export default class NoopPrinter implements PrinterInterface {
    // @ts-ignore
    print(...args: string[]): void {
    }
}