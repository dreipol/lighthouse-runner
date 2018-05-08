import PrinterInterface from "./LoggerInterface";

export default interface RunnerMeta {
    configFolder: string;
    configFile: string;
    reportFolder: string | null;
    printer: PrinterInterface;
}
