import { Page } from 'puppeteer';
import { ILogger } from "../Logger/ILogger";
export interface IPreAuditScript {
    execute(logger: ILogger, page: Page): Promise<void>;
}
