import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";
export default interface PersisterConfigInterface {
    modules: Array<string | ResultReporterInterface>;
}
