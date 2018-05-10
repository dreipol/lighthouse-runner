import PrinterInterface from "../Logger/LoggerInterface";
export default interface RunnerMeta {
    configFolder: string;
    configFile: string;
    reportFolder: string | null;
    printer: PrinterInterface;
}
