export default interface LighthouseOptions {
    chromeFlags?: string[];
    port?: number;
    disableDeviceEmulation?: boolean;
    disableNetworkThrottling?: boolean;
    disableCpuThrottling?: boolean;
}
