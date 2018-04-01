#!/usr/bin/env node
import {execute} from "../";
import NoopLogger from "../Logger/NoopLogger";
import ConsoleLogger from "../Logger/ConsoleLogger";
import writeDefaultConfig from '../setup/writeDefaultConfig.js';

export async function report(config: string, silent: boolean, port: number | null) {

    const printer = silent ? new NoopLogger() : new ConsoleLogger();

    return await execute(config, port, printer)
}

export async function setup(config: string) {
    return await writeDefaultConfig(config);
}
