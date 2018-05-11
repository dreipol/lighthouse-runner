import mkdirp = require('mkdirp');

export default function createFolder(path: string): Promise<undefined> {
    return new Promise((res, rej) => {
        mkdirp(path, (err:Error) => {
            if (err) {
                return rej(err);
            }
            return res();
        });
    });
}
