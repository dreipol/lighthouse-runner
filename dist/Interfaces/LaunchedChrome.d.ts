import { LaunchedChrome as Chrome } from "lighthouse/typings/externs";
export default interface LaunchedChrome {
    chrome?: Chrome | null;
    port: Number;
}
