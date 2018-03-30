#!/usr/bin/env node
import NoopResultPersister from "../ResultPersister/NoopResultPersister";
import {execute} from "../";
import NoopLogger from "../Logger/NoopLogger";
import JsonResultPersister from "../ResultPersister/JsonResultPersister";
import ConsoleLogger from "../Logger/ConsoleLogger";
import writeDefaultConfig from '../setup/writeDefaultConfig.js';
import HTMLResultPersister from "../ResultPersister/HTMLResultPersister";
import KeenResultPersister from "../ResultPersister/GraphiteResultPersister";

export async function report(config: string, type: string, silent: boolean, port: number | null) {

    const printer = silent ? new NoopLogger() : new ConsoleLogger();
    const persisters = [];
    persisters.push(new NoopResultPersister());
    const types: Array<string> = type.split('|');

    if (types.indexOf('json')  > -1) {
        persisters.push(new JsonResultPersister());
    }

    if (types.indexOf('html') > -1) {
        persisters.push(new HTMLResultPersister());
    }

    if (types.indexOf('graphite') > -1) {
        persisters.push(new KeenResultPersister());
    }

    return await execute(config, port, printer, persisters)
        .catch(console.error);
}

export async function setup(config: string) {
    return await writeDefaultConfig(config);
}
