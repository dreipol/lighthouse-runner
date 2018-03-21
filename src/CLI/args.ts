import { ConfigInterface, PropertyHolderInterface } from './Interfaces';
/**
 * Check if flag is allowed
 */
function isFlagAvailable(flags: Array<string>, flag: string): Boolean {
    return (flags.indexOf(flag) !== -1);
}

/**
 * Check if argument is allowed
 */
function isArgAvailable(args: Array<string>, arg: string): Boolean {
    let parts = arg.split('=');
    return (args.indexOf(parts[0]) !== -1);
}

/**
 * Parse all named arguments
 */
export default function getNamed({ args, flags }: ConfigInterface): PropertyHolderInterface {
    const availableArgs = args || [];
    const availableFlags = flags || [];

    let procArgs = process.argv;
    let namedArgs: PropertyHolderInterface = {};

    for (let i = 0; i < procArgs.length; i++) {
        let arg = procArgs[i];
        const originalArg = arg;

        if (arg.indexOf('--') === -1) {
            continue;
        }
        arg = arg.replace('--', '');

        if (isFlagAvailable(availableFlags, arg)) {
            namedArgs[arg] = true;
        } else if (isArgAvailable(availableArgs, arg)) {
            let parts = arg.split('=');
            namedArgs[parts[0]] = parts[1];
        } else {
            throw new Error(`Invalid argument ${originalArg}`);
        }
    }
    return namedArgs;
}