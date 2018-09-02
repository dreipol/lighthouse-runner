import { LoggerInterface } from './LoggerInterface';
import { Page } from 'puppeteer';
export interface PreAuditScriptInterface {
    execute(logger: LoggerInterface, page: Page): Promise<void>;
}
