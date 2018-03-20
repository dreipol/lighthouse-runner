import { LaunchedChrome as Chrome } from 'lighthouse/typings/externs';

export interface LaunchedChrome {
    chrome?: Chrome | null,
    port: Number
}