export default interface Budget {
    [index: string]: Number | boolean | undefined;

    dreipol?: Number | boolean;
    performance?: Number | boolean;
    pwa?: Number | boolean;
    accessibility?: Number | boolean;
    'best-practices'?: Number | boolean;
}
