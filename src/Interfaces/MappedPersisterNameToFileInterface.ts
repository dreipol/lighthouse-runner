import AbstractResultReporter from "../ResultReporter/AbstractResultReporter";

export default interface MappedPersisterNameToFileInterface {
    [index: string]: AbstractResultReporter;
}
