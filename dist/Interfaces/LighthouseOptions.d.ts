export default interface LighthouseOptions {
    chromeFlags?: Array<string>;
    port?: Number;
    disableDeviceEmulation?: Boolean;
    disableNetworkThrottling?: Boolean;
    disableCpuThrottling?: Boolean;
}
