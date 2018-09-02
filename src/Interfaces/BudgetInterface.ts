
export interface IBudget {
    [index: string]: string | number | boolean | undefined;

    dreipol?: string | number | boolean;
    performance?: string | number | boolean;
    pwa?: string | number | boolean;
    accessibility?: string | number | boolean;
    'best-practices'?: string | number | boolean;
}
