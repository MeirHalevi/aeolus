"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AeolusCache = void 0;
const errors_1 = require("../errors");
class AeolusCache {
    constructor() {
        this.UNINTIALIZE = 'Uninitialize store cache';
    }
    static getInstance() {
        if (!AeolusCache.instance) {
            AeolusCache.instance = new AeolusCache();
        }
        return AeolusCache.instance;
    }
    static setStoreCache(cache) {
        const instance = this.getInstance();
        instance.storeCache = cache;
    }
    count(key, period) {
        if (this.storeCache) {
            const keyExpire = this.keyAndExpiry(key, period);
            return this.storeCache.increment(keyExpire.key, 1, keyExpire.expire);
        }
        else {
            throw new errors_1.MissingStoreCahceError(this.UNINTIALIZE);
        }
    }
    async read(key) {
        if (this.storeCache) {
            return this.storeCache.read(key);
        }
        else {
            throw new errors_1.MissingStoreCahceError(this.UNINTIALIZE);
        }
    }
    async write(key, value, expiresIn) {
        if (this.storeCache) {
            this.storeCache.write(key, value, expiresIn);
        }
        else {
            throw new errors_1.MissingStoreCahceError(this.UNINTIALIZE);
        }
    }
    resetCount(key, period) {
        if (this.storeCache) {
            const keyExpire = this.keyAndExpiry(key, period);
            this.storeCache.delete(keyExpire.key);
        }
        else {
            throw new errors_1.MissingStoreCahceError(this.UNINTIALIZE);
        }
    }
    keyAndExpiry(unprefixedKey, period) {
        const lastEpochTime = new Date().getTime();
        const expireIn = (period - (lastEpochTime % period) + 1);
        const key = `${Math.floor(lastEpochTime / period)}:${unprefixedKey}`;
        return new KeyExpire(key, expireIn);
    }
    delete(key) {
        if (this.storeCache) {
            this.storeCache.delete(key);
        }
        else {
            throw new errors_1.MissingStoreCahceError(this.UNINTIALIZE);
        }
    }
}
exports.AeolusCache = AeolusCache;
class KeyExpire {
    constructor(key, expire) {
        this.key = key;
        this.expire = expire;
    }
}
