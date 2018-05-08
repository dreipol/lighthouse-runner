#!/usr/bin/env node
import {execute} from "../";
import NoopLogger from "../Logger/NoopLogger";
import ConsoleLogger from "../Logger/ConsoleLogger";
import writeDefaultConfig from './writeDefaultConfig.js';
import ReportCategory from "../Interfaces/ReportCategory";

export async function report(config: string, silent: boolean, port: number | null): Promise<Array<Array<ReportCategory>>> {
    const printer = silent ? new NoopLogger() : new ConsoleLogger();
    return await execute(config, port, printer)
}

export async function setup(config: string) {
    return await writeDefaultConfig(config);
}
