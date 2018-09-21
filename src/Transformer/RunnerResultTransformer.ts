import {values} from 'lodash';
import IReportResult from "../Interfaces/IReportResult";
import {ILighthouseResult} from "../Interfaces/ILighthouseResult";

export default class RunnerResultTransformer {
    static transform(result: ILighthouseResult): IReportResult {
        return {
            categoryGroups: values(result.lhr.categories),
            lhr: result.lhr,
            reporters: []
        };
    }
}
