import { AeolusCache } from '../cache';
export declare class FailToBan {
    protected aeolusCache: AeolusCache;
    static readonly FAIL_TO_BAN = "fail2ban";
    constructor();
    filter(discriminator: string, banTime: number, findTime: number, maxRetry: number, callback: () => boolean): Promise<boolean>;
    reset(discriminator: string, findTime: number): Promise<void>;
    protected fail(discriminator: string, banTime: number, findTime: number, maxRetry: number): Promise<boolean>;
    protected keyPrefix(): string;
    protected ban(discriminator: string, banTime: number): Promise<void>;
    private isBanned;
    protected keyPrefixCount(discriminator: string): string;
    private keyPrefixBan;
}
