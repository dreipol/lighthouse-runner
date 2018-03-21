"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFlagAvailable(flags, flag) {
    return (flags.indexOf(flag) !== -1);
}
function isArgAvailable(args, arg) {
    let parts = arg.split('=');
    return (args.indexOf(parts[0]) !== -1);
}
function getNamed({ args, flags }) {
    const availableArgs = args || [];
    const availableFlags = flags || [];
    let procArgs = process.argv;
    let namedArgs = {};
    for (let i = 0; i < procArgs.length; i++) {
        let arg = procArgs[i];
        const originalArg = arg;
        if (arg.indexOf('--') === -1) {
            continue;
        }
        arg = arg.replace('--', '');
        if (isFlagAvailable(availableFlags, arg)) {
            namedArgs[arg] = true;
        }
        else if (isArgAvailable(availableArgs, arg)) {
            let parts = arg.split('=');
            namedArgs[parts[0]] = parts[1];
        }
        else {
            throw new Error(`Invalid argument ${originalArg}`);
        }
    }
    return namedArgs;
}
exports.default = getNamed;
