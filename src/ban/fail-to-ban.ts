import { AeolusCache } from '../cache';

export class FailToBan {
    protected aeolusCache: AeolusCache;

    public static readonly FAIL_TO_BAN = 'fail2ban';

    constructor() {
        this.aeolusCache = AeolusCache.getInstance();
    }

    public async filter(discriminator: string, banTime: number, findTime: number, maxRetry: number, callback: () => boolean): Promise<boolean> {
        if (await this.isBanned(discriminator)) {
            return true;
        } else if (callback()) {
            return this.fail(discriminator, banTime, findTime, maxRetry);
        }
        return false;
    }

    public async reset(discriminator: string, findTime: number): Promise<void> {
        this.aeolusCache.resetCount(this.keyPrefixCount(discriminator), findTime);
        this.aeolusCache.delete(this.keyPrefixBan(discriminator));
    }

    protected async fail(discriminator: string, banTime: number, findTime: number, maxRetry: number): Promise<boolean> {
        const count: number = this.aeolusCache.count(this.keyPrefixCount(discriminator), findTime);
        if (count >= maxRetry) {
            this.ban(discriminator, banTime);
        }
        return true;
    }

    protected keyPrefix(): string {
        return FailToBan.FAIL_TO_BAN;
    }

    protected async ban(discriminator: string, banTime: number): Promise<void> {
        this.aeolusCache.write(this.keyPrefixBan(discriminator), '1', banTime);
    }

    private async isBanned(discriminator: string): Promise<boolean> {
        return await this.aeolusCache.read(this.keyPrefixBan(discriminator)) !== null;
    }

    protected keyPrefixCount(discriminator: string): string {
        return `${this.keyPrefix()}:count:${discriminator}`;
    }

    private keyPrefixBan(discriminator: string): string {
        return `${this.keyPrefix()}:ban:${discriminator}`;
    }
}
