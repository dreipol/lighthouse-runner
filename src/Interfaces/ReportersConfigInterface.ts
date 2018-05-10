import ResultReporterInterface from "../ResultReporter/ResultReporterInterface";

export default interface ReportersConfigInterface {
    modules: Array<string | ResultReporterInterface>;
}
