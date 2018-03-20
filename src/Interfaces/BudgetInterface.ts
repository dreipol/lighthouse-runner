export default interface BudgetInterface {
    [index: string]: Number | Boolean | undefined;

    dreipol?: Number | Boolean;
    performance?: Number | Boolean;
    pwa?: Number | Boolean;
    accessibility?: Number | Boolean;
    'best-practices'?: Number | Boolean;
}