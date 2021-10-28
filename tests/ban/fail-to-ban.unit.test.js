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
describe('FailToBan tests', () => {
    const failToBan = new index_1.FailToBan();
    describe('Without a cache defined in it', () => {
        describe('filter method', () => {
            it('should reject filter method', async () => {
                const callbackRule = sinon.fake.returns(true);
                await chai_1.expect(failToBan.filter('test', 120, 120, 5, callbackRule)).to.be.rejectedWith(Error);
            });
        });
        describe('reset method', () => {
            it('should reject reset method', async () => {
                await chai_1.expect(failToBan.reset('test', 120)).to.be.rejectedWith(Error);
            });
        });
    });
    describe('With a cache defined in it', () => {
        describe('filter method', () => {
            sinon.stub(failToBan, 'isBanned').returns(Promise.resolve(false));
            it('should return true when not banned & callback is true', async () => {
                const callbackRule = sinon.fake.returns(true);
                sinon.stub(failToBan, 'fail').returns(Promise.resolve(true));
                await chai_1.expect(failToBan.filter('test', 120, 120, 5, callbackRule)).to.eventually.be.true;
            });
            it('should return false when not banned & callback is false', async () => {
                const callbackRule = sinon.fake.returns(false);
                await chai_1.expect(failToBan.filter('test', 120, 120, 5, callbackRule)).to.eventually.be.false;
            });
        });
    });
});
