import { FailToBan } from './fail-to-ban';

export class AllowToBan extends FailToBan {

    public static readonly ALLOW_TO_BAN = 'allow2ban';

    protected keyPrefix() : string {
        return AllowToBan.ALLOW_TO_BAN;
    }

    protected fail(discriminitor: string, banTime: number, findTime: number, maxRetry: number) : boolean {
        const count: number = this.aeolusCache.count(`${this.keyPrefix()}:count:${discriminitor}`, findTime);
        if (count >= maxRetry) {
            this.ban(discriminitor, banTime);
        }
        return false;
    }
}
