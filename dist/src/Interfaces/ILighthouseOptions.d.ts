export default interface ILighthouseOptions {
    chromeFlags?: string[];
    port?: number | string;
    disableDeviceEmulation?: boolean;
    disableNetworkThrottling?: boolean;
    disableCpuThrottling?: boolean;
    disableStorageReset?: boolean;
}
