export default interface LighthouseOptions {
    chromeFlags?: string[];
    port?: number | string;
    disableDeviceEmulation?: boolean;
    disableNetworkThrottling?: boolean;
    disableCpuThrottling?: boolean;
    disableStorageReset?: boolean;
}
