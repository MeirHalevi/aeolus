import { FailToBan } from './fail-to-ban';
export declare class AllowToBan extends FailToBan {
    static readonly ALLOW_TO_BAN = "allow2ban";
    protected keyPrefix(): string;
    protected fail(discriminator: string, banTime: number, findTime: number, maxRetry: number): Promise<boolean>;
}
