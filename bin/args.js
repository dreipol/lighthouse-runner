/**
 * Parse all named arguments
 * 
 * @returns {Object}
 */
module.exports = function getNamed(defaultArgs){
    let args = process.argv;
    let namedArgs = defaultArgs;

    for(let i = 0; i < args.length; i++){
        let arg = args[i];
        arg = arg.replace('--', '');
        let parts = arg.split('=');
        namedArgs[parts[0]] = parts[1];
    }
    return namedArgs;
}