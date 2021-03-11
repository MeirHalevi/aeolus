import { StoreCache } from '../interfaces/index'
import { MissingStoreCahceError } from '../errors/index'

export class AeolusCache {
    private static instance: AeolusCache;
    private storeCache?: StoreCache;

    private constructor() {}

    static getInstance() : AeolusCache {
        if(!AeolusCache.instance) {
            AeolusCache.instance = new AeolusCache();
        }
    
        return AeolusCache.instance;
    }

    static setStoreCache(cache: StoreCache) {
        let instance = this.getInstance();
        instance.storeCache = cache;
    }

    count(key: string, period: number) : number {
        if(this.storeCache){
            var keyExpire : KeyExpire = this.keyAndExpiry(key, period);
            return this.storeCache.increment(keyExpire.key, 1, keyExpire.expire);
        } else {
            throw new MissingStoreCahceError("UnInitialize store cache");
        }
    }

    read(key: string) : number {
        if(this.storeCache){
            return this.storeCache.read(key);
        } else {
            throw new MissingStoreCahceError("UnInitialize store cache");
        }
    }

    write(key: string, value: number, expiresIn: number) {
        if(this.storeCache) {
            this.storeCache.write(key, value, expiresIn);
        } else {
            throw new MissingStoreCahceError("UnInitialize store cache");
        }
    }

    resetCount(key: string, period: number) {
        if(this.storeCache) {
            var keyExpire : KeyExpire = this.keyAndExpiry(key, period);
            this.storeCache.delete(keyExpire.key);
        } else {
            throw new MissingStoreCahceError("UnInitialize store cache")
        }
    }

    private keyAndExpiry(unprefixedKey: string, period: number): KeyExpire {
        var lastEpochTime : number = new Date().getTime();
        var expireIn : number = (period - (lastEpochTime % period) + 1);
        var key : string = `${Math.floor(lastEpochTime / period)}:${unprefixedKey}`;
        return new KeyExpire(key, expireIn);
    }

    delete(key: string) {
        if(this.storeCache) {
            this.storeCache.delete(key);
        } else {
            throw new MissingStoreCahceError("UnInitialize store cache");
        }
    }
}

class KeyExpire {
    key: string;
    expire: number;

    constructor(key: string, expire: number) {
        this.key = key;
        this.expire = expire;
    }
}