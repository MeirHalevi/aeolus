"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const index_1 = require("../../index");
const sinon = __importStar(require("sinon"));
describe('Rules container tests', () => {
    let mockRequest;
    describe('Block rules', () => {
        it('should return blocked when blocked rule was defined', () => {
            const rulesContainer = new index_1.RulesContainer();
            const callbackRule = sinon.fake.returns(true);
            rulesContainer.addBlockRule(callbackRule, 'block');
            const operation = new index_1.Operation(rulesContainer);
            chai_1.expect(operation.run(mockRequest)).to.eventually.equal(index_1.OperationResult.BLOCKED);
        });
    });
    describe('Allow rules', () => {
        it('should return allawed when allowed rule was defined', () => {
            const rulesContainer = new index_1.RulesContainer();
            const callbackRule = sinon.fake.returns(true);
            rulesContainer.addAllowRules(callbackRule, 'allow');
            const operation = new index_1.Operation(rulesContainer);
            chai_1.expect(operation.run(mockRequest)).to.eventually.equal(index_1.OperationResult.ALLOWED);
        });
        it('should return allwoed when blocked rule & allow rule were defined', () => {
            const rulesContainer = new index_1.RulesContainer();
            const callbackRule = sinon.fake.returns(true);
            rulesContainer.addBlockRule(callbackRule, 'allow');
            rulesContainer.addAllowRules(callbackRule, 'allow');
            const operation = new index_1.Operation(rulesContainer);
            chai_1.expect(operation.run(mockRequest)).to.eventually.equal(index_1.OperationResult.ALLOWED);
        });
    });
    describe('Regular', () => {
        it('should return reqular when the rules did not apply', () => {
            const rulesContainer = new index_1.RulesContainer();
            const callbackRule = sinon.fake.returns(false);
            rulesContainer.addBlockRule(callbackRule, 'allow');
            rulesContainer.addAllowRules(callbackRule, 'allow');
            const operation = new index_1.Operation(rulesContainer);
            chai_1.expect(operation.run(mockRequest)).to.eventually.equal(index_1.OperationResult.REGULAR);
        });
        it('should return reqular when the rulesContainer have no rules defined in it', () => {
            const rulesContainer = new index_1.RulesContainer();
            const operation = new index_1.Operation(rulesContainer);
            chai_1.expect(operation.run(mockRequest)).to.eventually.equal(index_1.OperationResult.REGULAR);
        });
    });
});
