import { AeolusCache } from '../cache/index';

export class FailToBan {
    protected aeolusCache: AeolusCache;

    public static readonly FAIL_TO_BAN = 'fail2ban';

    constructor() {
        this.aeolusCache = AeolusCache.getInstance();
    }

    public async filter(discriminator: string, banTime: number, findTime: number, maxRetry: number, callback: () => boolean) : Promise<boolean> {
        if (this.isBanned(discriminator)) {
            return true;
        }
        else if (callback()) {
            return this.fail(discriminator, banTime, findTime, maxRetry);
        }
        return false;
    }

    public async reset(discriminator: string, findTime: number) : Promise<void> {
        this.aeolusCache.resetCount(`${this.keyPrefix()}:count:${discriminator}`, findTime);
        this.aeolusCache.delete(`${this.keyPrefix()}:ban:${discriminator}}`);
    }

    protected fail(discriminator: string, banTime: number, findTime: number, maxRetry: number) : boolean {
        const count: number = this.aeolusCache.count(`${this.keyPrefix()}:count:${discriminator}`, findTime);
        if (count >= maxRetry) {
            this.ban(discriminator, banTime);
        }
        return true;
    }

    protected keyPrefix() : string {
        return FailToBan.FAIL_TO_BAN;
    }

    protected ban(discriminator: string, banTime: number) : void {
        this.aeolusCache.write(`${this.keyPrefix()}:ban:${discriminator}`, 1, banTime);
    }

    private isBanned(discriminator: string) : boolean {
        return this.aeolusCache.read(`${this.keyPrefix()}:ban:${discriminator}`) != null;
    }
}
