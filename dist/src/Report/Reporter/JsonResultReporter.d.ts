import AbstractReporter from '../AbstractReporter';
import IReportResult from '../../Interfaces/IReportResult';
import { IKeyValue } from '../../Interfaces/IKeyValue';
export default class JsonResultReporter extends AbstractReporter {
    key: string;
    setup(): Promise<void>;
    handle(url: string, results: IReportResult): Promise<IKeyValue | void>;
}
