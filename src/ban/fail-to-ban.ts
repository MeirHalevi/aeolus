import { AeolusCache } from '../cache/index'
const FAIL_TO_BAN = 'fail2ban';

export class FailToBan {
    protected aeolusCache: AeolusCache;

    static get FAIL_TO_BAN() {
        return FAIL_TO_BAN;
    }

    constructor() {
        this.aeolusCache = AeolusCache.getInstance();
    }

    public filter(discriminator: string, banTime: number, findTime: number, maxRetry: number, callback: Function) : boolean {
        if(this.isBanned(discriminator)) {
            return true;
        }
        else if (callback()){
            return this.fail(discriminator, banTime, findTime, maxRetry);
        }
        return false;
    }

    
    public reset(discriminator: string, findTime: number) {
        this.aeolusCache.resetCount(`${this.keyPrefix()}:count:${discriminator}`, findTime);
        this.aeolusCache.delete(`${this.keyPrefix()}:ban:${discriminator}}`);
    }

    protected fail(discriminator: string, banTime: number, findTime: number, maxRetry: number): boolean {
        var count: number = this.aeolusCache.count(`${this.keyPrefix()}:count:${discriminator}`, findTime);
        if(count >= maxRetry){
            this.ban(discriminator, banTime);
        }
        return true;
    }

    protected keyPrefix() : string {
        return FAIL_TO_BAN;
    }

    protected ban(discriminator: string, banTime: number) {
        this.aeolusCache.write("${KEY_PREFIX}:ban:${discriminator}", 1, banTime);
    }

    private isBanned(discriminator: string): boolean {
        return this.aeolusCache.read(`${this.keyPrefix()}:ban:${discriminator}`) != null;
    }
}