"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailToBan = void 0;
const cache_1 = require("../cache");
class FailToBan {
    constructor() {
        this.aeolusCache = cache_1.AeolusCache.getInstance();
    }
    async filter(discriminator, banTime, findTime, maxRetry, callback) {
        if (await this.isBanned(discriminator)) {
            return true;
        }
        else if (callback()) {
            return this.fail(discriminator, banTime, findTime, maxRetry);
        }
        return false;
    }
    async reset(discriminator, findTime) {
        this.aeolusCache.resetCount(this.keyPrefixCount(discriminator), findTime);
        this.aeolusCache.delete(this.keyPrefixBan(discriminator));
    }
    async fail(discriminator, banTime, findTime, maxRetry) {
        const count = this.aeolusCache.count(this.keyPrefixCount(discriminator), findTime);
        if (count >= maxRetry) {
            this.ban(discriminator, banTime);
        }
        return true;
    }
    keyPrefix() {
        return FailToBan.FAIL_TO_BAN;
    }
    async ban(discriminator, banTime) {
        this.aeolusCache.write(this.keyPrefixBan(discriminator), '1', banTime);
    }
    async isBanned(discriminator) {
        return await this.aeolusCache.read(this.keyPrefixBan(discriminator)) !== null;
    }
    keyPrefixCount(discriminator) {
        return `${this.keyPrefix()}:count:${discriminator}`;
    }
    keyPrefixBan(discriminator) {
        return `${this.keyPrefix()}:ban:${discriminator}`;
    }
}
exports.FailToBan = FailToBan;
FailToBan.FAIL_TO_BAN = 'fail2ban';
