"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowToBan = void 0;
const fail_to_ban_1 = require("./fail-to-ban");
class AllowToBan extends fail_to_ban_1.FailToBan {
    keyPrefix() {
        return AllowToBan.ALLOW_TO_BAN;
    }
    async fail(discriminator, banTime, findTime, maxRetry) {
        const count = this.aeolusCache.count(this.keyPrefixCount(discriminator), findTime);
        if (count >= maxRetry) {
            this.ban(discriminator, banTime);
        }
        return false;
    }
}
exports.AllowToBan = AllowToBan;
AllowToBan.ALLOW_TO_BAN = 'allow2ban';
