import { StoreCache } from '../interfaces';
export declare class AeolusCache {
    private static instance;
    private storeCache?;
    private readonly UNINTIALIZE;
    static getInstance(): AeolusCache;
    static setStoreCache(cache: StoreCache): void;
    count(key: string, period: number): number;
    read(key: string): Promise<string | null>;
    write(key: string, value: string, expiresIn: number): Promise<void>;
    resetCount(key: string, period: number): void;
    private keyAndExpiry;
    delete(key: string): void;
}
