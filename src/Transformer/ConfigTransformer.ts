import {merge} from 'lodash';
import {IInitialConfig} from "../Interfaces/IInitialConfig";
import {IDreihouseConfig} from "../Interfaces/IDreihouseConfig";

const DEFAULT_LIGHTHOUSE_CONFIG = require('../../config/lighthouse-config.js');


export default class ConfigTransformer {
    public static transform(config: IInitialConfig): IDreihouseConfig {
        const lighthouse = Object.assign({}, DEFAULT_LIGHTHOUSE_CONFIG);
        lighthouse.audits = merge(lighthouse.audits, config.audits);
        lighthouse.passes.push({
            passName: 'offlinePass',
            gatherers: config.gatherers,
        });
        
        return {
            paths: config.paths,
            folder: config.folder,
            chromeFlags: config.chromeFlags,
            initialPageload: config.initialPageload,
            disableEmulation: config.disableEmulation,
            disableThrottling: config.disableThrottling,
            budget: config.budget,
            tag: config.tag,
            preAuditScripts: config.preAuditScripts,
            lighthouse
        };
    }
}
