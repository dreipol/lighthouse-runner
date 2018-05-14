import {Page} from 'puppeteer';
import LoggerInterface from '../Logger/LoggerInterface';

export default interface PreAuditScriptInterface {
    execute(logger: LoggerInterface, page: Page): Promise<void>;
}
