"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowRule = void 0;
const rule_1 = require("./rule");
class AllowRule extends rule_1.Rule {
    constructor(func, name) {
        super(func, name);
        this.type = rule_1.Rule.ALLOW_RULE;
    }
}
exports.AllowRule = AllowRule;
