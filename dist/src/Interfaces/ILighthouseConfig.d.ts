export interface Passes {
    passName: string;
    recordTrace: boolean;
    useThrottling: boolean;
    pauseAfterLoadMs: number;
    networkQuietThresholdMs: number;
    cpuQuietThresholdMs: number;
    gatherers: string[];
}
export interface Group {
    title: string;
    description: string;
}
export interface CategoryAudit {
    id: string;
    weight: number;
    group?: string;
}
export interface Categories {
    name: string;
    description: string;
    audits: CategoryAudit[];
}
export interface ThrottlingConfig {
    rttMs: number;
    throughputKbps: number;
    requestLatencyMs: number;
    downloadThroughputKbps: number;
    uploadThroughputKbps: number;
    cpuSlowdownMultiplier: number;
}
export interface Settings {
    maxWaitForLoad: number;
    throttlingMethod: number;
    throttling: ThrottlingConfig;
}
export interface ILighthouseConfig {
    settings: Settings | null;
    passes: Passes[];
    audits: string[];
    groups: {
        [key: string]: Group;
    };
    categories: {
        [key: string]: Categories;
    };
}
