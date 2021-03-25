import { StoreCache } from '../interfaces/index';
import { MissingStoreCahceError } from '../errors/index';

export class AeolusCache {
    private static instance: AeolusCache;
    private storeCache?: StoreCache;

    private constructor() {}

    static getInstance() : AeolusCache {
        if (!AeolusCache.instance) {
            AeolusCache.instance = new AeolusCache();
        }

        return AeolusCache.instance;
    }

    static setStoreCache(cache: StoreCache) : void {
        const instance = this.getInstance();
        instance.storeCache = cache;
    }

    count(key: string, period: number) : number {
        if (this.storeCache) {
            const keyExpire : KeyExpire = this.keyAndExpiry(key, period);
            return this.storeCache.increment(keyExpire.key, 1, keyExpire.expire);
        } else {
            throw new MissingStoreCahceError('Uninitialize store cache');
        }
    }

    read(key: string) : number {
        if (this.storeCache) {
            return this.storeCache.read(key);
        } else {
            throw new MissingStoreCahceError('Uninitialize store cache');
        }
    }

    write(key: string, value: number, expiresIn: number) : void {
        if (this.storeCache) {
            this.storeCache.write(key, value, expiresIn);
        } else {
            throw new MissingStoreCahceError('Uninitialize store cache');
        }
    }

    resetCount(key: string, period: number) : void {
        if (this.storeCache) {
            const keyExpire : KeyExpire = this.keyAndExpiry(key, period);
            this.storeCache.delete(keyExpire.key);
        } else {
            throw new MissingStoreCahceError('Uninitialize store cache');
        }
    }

    private keyAndExpiry(unprefixedKey: string, period: number): KeyExpire {
        const lastEpochTime : number = new Date().getTime();
        const expireIn : number = (period - (lastEpochTime % period) + 1);
        const key = `${Math.floor(lastEpochTime / period)}:${unprefixedKey}`;
        return new KeyExpire(key, expireIn);
    }

    delete(key: string) : void {
        if (this.storeCache) {
            this.storeCache.delete(key);
        } else {
            throw new MissingStoreCahceError('Uninitialize store cache');
        }
    }
}

class KeyExpire {
    constructor(
        public key: string,
        public expire: number) {}
}
