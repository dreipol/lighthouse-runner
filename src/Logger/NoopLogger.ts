import {ILogger} from "./ILogger";

export default class NoopLogger implements ILogger {
    public debug(...args: string[]): void {
        //
    }
    
    public error(...args: string[]): void {
        //
    }
    
    public info(...args: string[]): void {
        //
    }
    
    public setLevel(level: number): void {
        //
    }
    
    public getLevel(){
        return 0;
    }
}
