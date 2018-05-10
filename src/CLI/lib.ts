import NoopLogger from "../Logger/NoopLogger";
import ConsoleLogger from "../Logger/ConsoleLogger";
import writeDefaultConfig from './writeDefaultConfig';
import ReportCategory from "../Interfaces/ReportCategory";
import Dreihouse from "../Dreihouse";

export async function report(config: string, silent: boolean, port: number | null): Promise<Array<Array<ReportCategory>>> {
    const printer = silent ? new NoopLogger() : new ConsoleLogger();
    const dreihouse = new Dreihouse(config, printer);
    return await dreihouse.execute(port);
}

export async function setup(config: string) {
    return await writeDefaultConfig(config);
}
