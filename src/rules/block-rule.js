"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockRule = void 0;
const rule_1 = require("./rule");
class BlockRule extends rule_1.Rule {
    constructor(func, name) {
        super(func, name);
        this.type = rule_1.Rule.BLOCK_RULE;
    }
}
exports.BlockRule = BlockRule;
