import { Page } from 'puppeteer';
import LoggerInterface from '../../Logger/LoggerInterface';
export default interface SetupScript {
    execute(logger: LoggerInterface, page: Page): Promise<void>;
}
