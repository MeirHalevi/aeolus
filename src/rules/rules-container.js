"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesContainer = void 0;
const block_rule_1 = require("./block-rule");
const allow_rule_1 = require("./allow-rule");
/**
 * Rules Container
 * Includes the lists of the allowed & blocked rules.
 */
class RulesContainer {
    constructor() {
        this.blockRules = [];
        this.allowRules = [];
    }
    addBlockRule(callback, name) {
        this.blockRules.push(new block_rule_1.BlockRule(callback, name));
    }
    addAllowRules(callback, name) {
        this.allowRules.push(new allow_rule_1.AllowRule(callback, name));
    }
    async isBlocked(request) {
        const fetchResult = await Promise.all(this.blockRules.map((blockRule) => blockRule.check(request)));
        return Promise.resolve(fetchResult.some(blocked => blocked));
    }
    async isAllowed(request) {
        const fetchResult = await Promise.all(this.allowRules.map((allowRules) => allowRules.check(request)));
        return Promise.resolve(fetchResult.some(allowed => allowed));
    }
}
exports.RulesContainer = RulesContainer;
