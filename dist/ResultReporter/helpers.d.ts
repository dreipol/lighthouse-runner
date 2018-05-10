export declare function formatDate(date: Date): string;
export declare function getPathname(url: string): string;
export declare function createFolder(path: string): Promise<undefined>;
export declare function writeFile(url: string, folder: string, content: string, type: string, prefix?: string, suffix?: string): string;
export declare function readFile(path: string): string;
