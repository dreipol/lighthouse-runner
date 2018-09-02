import IReportResult from "../Interfaces/IReportResult";
import {IKeyValue} from "../Interfaces/IKeyValue";

export default interface IReporter {
    key: string;
    
    setup?(): Promise<void>;
    
    handle(url: string, results: IReportResult): Promise<IKeyValue | void>;
}
