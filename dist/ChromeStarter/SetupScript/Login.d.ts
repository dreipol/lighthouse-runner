import { Page } from 'puppeteer';
import SetupScript from './SetupScript';
import LoggerInterface from '../../Logger/LoggerInterface';
export default class Login implements SetupScript {
    execute(logger: LoggerInterface, page: Page): Promise<void>;
}
