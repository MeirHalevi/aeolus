import { FailToBan } from './fail-to-ban'
const ALLOW_TO_BAN = 'allow2ban';

export class AllowToBan extends FailToBan {

    static get ALLOW_TO_BAN() {
        return ALLOW_TO_BAN;
    }

    protected keyPrefix() : string {
        return ALLOW_TO_BAN;
    }

    fail(discriminitor: string, banTime: number, findTime: number, maxRetry: number) : boolean {
        var count: number = this.aeolusCache.count(`${this.keyPrefix()}:count:${discriminitor}`, findTime);
        if(count >= maxRetry) {
            this.ban(discriminitor, banTime);
        }
        return false;
    }
}
