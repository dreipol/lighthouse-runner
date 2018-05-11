import ResultReporterInterface from '../../ResultReporter/ResultReporterInterface';
export default interface ReportersConfig {
    modules: Array<string | ResultReporterInterface>;
}
