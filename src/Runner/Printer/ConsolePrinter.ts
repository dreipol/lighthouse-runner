import { info } from 'fancy-log';
import PrinterInterface from './Interface';

export default class ConsolePrinter implements PrinterInterface {

    print(...args: string[]): void {
        info(...args);
    }
}