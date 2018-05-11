import { Page } from 'puppeteer';
import LoggerInterface from '../Logger/LoggerInterface';
export default interface PreAuditScript {
    execute(logger: LoggerInterface, page: Page): Promise<void>;
}
