"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
/**
 * Rule class
 * Each rule have a name and a callback method that check
 * if the rule match/mismatch
 **/
class Rule {
    constructor(func, name) {
        this.func = func;
        this.type = '';
        this.name = name;
    }
    /**
     * Check if the request match to the rule that was defined in the callback.
     * In case of match, enrich the request with headers for external use.
     * @param request the request the interceptor/middleware get
     * @returns boolean flag if it match to the rule defined in the callback
     */
    async check(request) {
        const match = await this.func(request);
        if (match) {
            // TO DO - Add data to the headers of the request
        }
        return match;
    }
}
exports.Rule = Rule;
Rule.BLOCK_RULE = 'block';
Rule.ALLOW_RULE = 'allow';
