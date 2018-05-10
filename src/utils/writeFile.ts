import {parse} from "url";
import {writeFileSync} from "fs";
import {join} from "path";
import formatDate from "./formatDate";
import urlToPath from "./urlToPath";

export default function writeFile(url: string, folder: string, content: string, type: string, prefix: string = '', suffix: string = ''): string {

    const reportUrl = parse(url);
    const pathname = urlToPath(url);
    const filenamePrefix = formatDate(new Date());
    if(suffix){
        suffix = `.${suffix}`
    }

    if(prefix){
        prefix = `${prefix}.`
    }

    const filename = join(folder, `${prefix}${filenamePrefix}__${reportUrl.hostname}__${pathname}${suffix}.${type}`);

    writeFileSync(filename, content);
    return filename;
}
