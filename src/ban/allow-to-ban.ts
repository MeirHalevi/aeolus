import { FailToBan } from './fail-to-ban';

export class AllowToBan extends FailToBan {
    public static readonly ALLOW_TO_BAN = 'allow2ban';

    protected keyPrefix(): string {
        return AllowToBan.ALLOW_TO_BAN;
    }

    protected async fail(discriminator: string, banTime: number, findTime: number, maxRetry: number) : Promise<boolean> {
        const count: number = this.aeolusCache.count(this.keyPrefixCount(discriminator), findTime);
        if (count >= maxRetry) {
            this.ban(discriminator, banTime);
        }
        return false;
    }
}
