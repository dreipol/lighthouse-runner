#!/usr/bin/env node
import NoopResultPersister from "../ResultPersister/NoopResultPersister";
import {execute} from "../";
import NoopLogger from "../Logger/NoopLogger";
import JsonResultPersister from "../ResultPersister/JsonResultPersister";
import ConsoleLogger from "../Logger/ConsoleLogger";
import writeDefaultConfig from '../setup/writeDefaultConfig.js';

export async function report(config: string, type: string, silent: boolean, port: number | null) {

    const printer = silent ? new NoopLogger() : new ConsoleLogger();
    let persister = new NoopResultPersister();

    if (type === 'json') {
        persister = new JsonResultPersister();
    }

    return await execute(config, port, printer, persister)
        .catch(console.error);
}

export async function setup(config: string) {
    return await writeDefaultConfig(config);
}
